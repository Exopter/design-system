# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy==2.4.6"]
# ///
"""Cut the exported wing meshes into spanwise sections for the airflow model.

Reads assets/blueprints/exowing-scene.glb and writes exowing-sections.json: per
station of the half span, the leading edge, the trailing edge and the upper and
lower surface heights along the chord, in the GLB frame (+x right, +y up, -z forward).
"""

from pathlib import Path

ASSETS = Path(__file__).resolve().parents[1] / "assets" / "blueprints"
import json
import struct
import numpy as np
def load(path):
    b=open(path,'rb').read()
    assert b[:4]==b'glTF'
    off=12; chunks=[]
    while off<len(b):
        l,t=struct.unpack('<II',b[off:off+8]); chunks.append((t,b[off+8:off+8+l])); off+=8+l
    return json.loads(chunks[0][1]), (chunks[1][1] if len(chunks)>1 else b'')
CT={5120:'b',5121:'B',5122:'h',5123:'H',5125:'I',5126:'f'}; NC={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT4':16}
def acc(j,bin,i):
    a=j['accessors'][i]; bv=j['bufferViews'][a['bufferView']]
    dt=np.dtype('<'+CT[a['componentType']]); n=NC[a['type']]
    o=bv.get('byteOffset',0)+a.get('byteOffset',0); stride=bv.get('byteStride',0)
    if stride and stride!=dt.itemsize*n:
        arr=np.array([np.frombuffer(bin,dt,n,o+k*stride) for k in range(a['count'])])
    else: arr=np.frombuffer(bin,dt,a['count']*n,o).reshape(a['count'],n)
    return arr
j,b=load(ASSETS / 'exowing-scene.glb')
tris=[]
for node in j['nodes']:
    if not str(node.get('name','')).startswith('wing-'): continue
    for p in j['meshes'][node['mesh']]['primitives']:
        v=acc(j,b,p['attributes']['POSITION']).astype(float); idx=acc(j,b,p['indices']).reshape(-1,3)
        tris.append(v[idx])
T=np.concatenate(tris)  # (n,3,3)
def section(x):
    d=T[:,:,0]-x
    pts=[]
    for a,c in ((0,1),(1,2),(2,0)):
        da,dc=d[:,a],d[:,c]; m=(da*dc<0)
        t=da[m]/(da[m]-dc[m]); P=T[m,a]+(T[m,c]-T[m,a])*t[:,None]
        pts.append((np.nonzero(m)[0],P))
    # each crossing triangle yields exactly two points -> a segment in (z,y)
    seg={}
    for ids,P in pts:
        for i,pp in zip(ids,P): seg.setdefault(i,[]).append(pp[[2,1]])
    S=np.array([s for s in seg.values() if len(s)==2])
    return S
NS=17
out=[]
for x in np.round(np.linspace(0.0,2.98,150),4):
    xs = x if x>0 else 0.004
    S=section(xs)
    if len(S)<8: continue
    z=S[:,:,0]; zle=z.min(); zte=z.max(); yu=[];yl=[]
    for s in np.linspace(0,1,NS):
        zz=zle+(zte-zle)*(0.004+0.992*s)
        lo=np.minimum(z[:,0],z[:,1]); hi=np.maximum(z[:,0],z[:,1]); m=(lo<=zz)&(hi>=zz)&(hi>lo)
        if not m.any(): yu.append(None); yl.append(None); continue
        A=S[m]; t=(zz-A[:,0,0])/(A[:,1,0]-A[:,0,0]); y=A[:,0,1]+(A[:,1,1]-A[:,0,1])*t
        yu.append(float(y.max())); yl.append(float(y.min()))
    out.append((float(x),float(zle),float(zte),yu,yl))
# report + resample to 0.1 stations using the median over neighbours to drop local artefacts
for o in out[::10]: print(f"x {o[0]:.2f} LE {o[1]:.3f} TE {o[2]:.3f} chord {o[2]-o[1]:.3f} t_max {max(u-l for u,l in zip(o[3],o[4]) if u is not None):.3f} yu0 {o[3][0]} yuN {o[3][-1]}")
stations=[{"x":o[0],"le":round(o[1],4),"te":round(o[2],4),"yu":[None if u is None else round(u,4) for u in o[3]],"yl":[None if u is None else round(u,4) for u in o[4]]} for o in out[::5]]
json.dump({"frame":"wing glb: +x right, +y up, -z forward","source":"exowing-scene.glb wing-center, wing-right, wing-left","samples":NS,"stations":stations},open(ASSETS / 'exowing-sections.json', 'w'))
print(len(stations),'stations')
