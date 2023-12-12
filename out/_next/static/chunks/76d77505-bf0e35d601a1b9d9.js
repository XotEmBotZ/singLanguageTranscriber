"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[425],{30565:function(t,e,i){i.d(e,{$p:function(){return b},U7:function(){return E},_0:function(){return T},lx:function(){return z},nd:function(){return A}});var s=i(90933),r=i(48151),n=i(87676),l=i(75351),a=i(22944),u=i(51286),h=i(38791),o=i(5136),c=i(83135),p=i(84543),g=i(72678),d=i(36567),I=i(86883),C=i(30801);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */function z(t,e,i,s){if(Array.isArray(t)){if(null!=e||null!=i)throw new h.nu("When inputs is an array, neither initialState or constants should be provided");null!=s&&(i=t.slice(t.length-s,t.length),t=t.slice(0,t.length-s)),t.length>1&&(e=t.slice(1,t.length)),t=t[0]}function r(t){return null==t||Array.isArray(t)?t:[t]}return{inputs:t,initialState:e=r(e),constants:i=r(i)}}function A(t,e,i,r=!1,n,l,a=!1,u=!1){return s.lub(()=>{let o,c,p;let d=e.shape.length;if(d<3)throw new h.nu(`Input should be at least 3D, but is ${d}D.`);let I=[1,0].concat(g.w6(2,d));if(e=s.p4s(e,I),null!=l)throw new h.nj("The rnn() functoin of the deeplearn.js backend does not support constants yet.");a&&console.warn("Backend rnn(): the unroll = true option is not applicable to the imperative deeplearn.js backend."),null!=n&&((n=s.pju(s.pju(n,"bool"),"float32")).rank===d-1&&(n=s.dt4(n,-1)),n=s.p4s(n,I)),r&&(e=s.GYS(e,0),null!=n&&(n=s.GYS(n,0)));let C=[],z=i,A=e.shape[0],b=s.HHK(e);null!=n&&(c=s.HHK(n));for(let e=0;e<A;++e){let i=b[e],r=s.lub(()=>t(i,z));if(null==n)o=r[0],z=r[1];else{let t=s.lub(()=>{let t=c[e],i=s.luU(s.JpU(t),t),n=s.IHx(s.dC7(r[0],t),s.dC7(z[0],i)),l=z.map((e,n)=>s.IHx(s.dC7(r[1][n],t),s.dC7(e,i)));return{output:n,newStates:l}});o=t.output,z=t.newStates}u&&C.push(o)}return u&&(p=s.knu(C,1)),[o,p,z]})}class b extends u.mh{constructor(t){let e;if(super(t),null==t.cell)throw new h.nu("cell property is missing for the constructor of RNN.");if(null==(e=Array.isArray(t.cell)?new D({cells:t.cell}):t.cell).stateSize)throw new h.nu("The RNN cell should have an attribute `stateSize` (tuple of integers, one integer per RNN state).");this.cell=e,this.returnSequences=null!=t.returnSequences&&t.returnSequences,this.returnState=null!=t.returnState&&t.returnState,this.goBackwards=null!=t.goBackwards&&t.goBackwards,this._stateful=null!=t.stateful&&t.stateful,this.unroll=null!=t.unroll&&t.unroll,this.supportsMasking=!0,this.inputSpec=[new u.Zg({ndim:3})],this.stateSpec=null,this.states_=null,this.numConstants=null,this.keptStates=[]}getStates(){if(null!=this.states_)return this.states_;{let t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;return g.w6(0,t).map(t=>null)}}setStates(t){this.states_=t}computeOutputShape(t){let e;(0,d.XO)(t)&&(t=t[0]);let i=this.cell.stateSize;Array.isArray(i)||(i=[i]);let s=i[0];if(e=this.returnSequences?[t[0],t[1],s]:[t[0],s],!this.returnState)return e;{let s=[];for(let e of i)s.push([t[0],e]);return[e].concat(s)}}computeMask(t,e){return s.lub(()=>{Array.isArray(e)&&(e=e[0]);let t=this.returnSequences?e:null;if(!this.returnState)return t;{let e=this.states.map(t=>null);return[t].concat(e)}})}get states(){if(null!=this.states_)return this.states_;{let t=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1,e=[];for(let i=0;i<t;++i)e.push(null);return e}}set states(t){this.states_=t}build(t){let e;if(null!=this.numConstants)throw new h.nj("Constants support is not implemented in RNN yet.");(0,d.XO)(t)&&(t=t[0]);let i=this.stateful?t[0]:null,r=t.slice(2);this.inputSpec[0]=new u.Zg({shape:[i,null,...r]});let n=[t[0]].concat(t.slice(2));if(this.cell.build(n),e=Array.isArray(this.cell.stateSize)?this.cell.stateSize:[this.cell.stateSize],null!=this.stateSpec){if(!s.D5U.arraysEqual(this.stateSpec.map(t=>t.shape[t.shape.length-1]),e))throw new h.nu(`An initialState was passed that is not compatible with cell.stateSize. Received stateSpec=${this.stateSpec}; However cell.stateSize is ${this.cell.stateSize}`)}else this.stateSpec=e.map(t=>new u.Zg({shape:[null,t]}));this.stateful&&this.resetStates()}resetStates(t,e=!1){(0,s.lub)(()=>{if(!this.stateful)throw new h.j1("Cannot call resetStates() on an RNN Layer that is not stateful.");let i=this.inputSpec[0].shape[0];if(null==i)throw new h.nu("If an RNN is stateful, it needs to know its batch size. Specify the batch size of your input tensors: \n- If using a Sequential model, specify the batch size by passing a `batchInputShape` option to your first layer.\n- If using the functional API, specify the batch size by passing a `batchShape` option to your Input layer.");if(null==this.states_)Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(t=>s.lls([i,t])):this.states_=[s.lls([i,this.cell.stateSize])];else if(null==t)s.B90(this.states_),null!=this.keptStates&&(s.B90(this.keptStates),this.keptStates=[]),Array.isArray(this.cell.stateSize)?this.states_=this.cell.stateSize.map(t=>s.lls([i,t])):this.states_[0]=s.lls([i,this.cell.stateSize]);else{if(Array.isArray(t)||(t=[t]),t.length!==this.states_.length)throw new h.nu(`Layer ${this.name} expects ${this.states_.length} state(s), but it received ${t.length} state value(s). Input received: ${t}`);!0===e?this.keptStates.push(this.states_.slice()):s.B90(this.states_);for(let e=0;e<this.states_.length;++e){let r=t[e],n=Array.isArray(this.cell.stateSize)?this.cell.stateSize[e]:this.cell.stateSize,l=[i,n];if(!s.D5U.arraysEqual(r.shape,l))throw new h.nu(`State ${e} is incompatible with layer ${this.name}: expected shape=${l}, received shape=${r.shape}`);this.states_[e]=r}}this.states_=this.states_.map(t=>s.CnY(t.clone()))})}apply(t,e){let i=null==e?null:e.initialState,s=null==e?null:e.constants;null==e&&(e={});let r=z(t,i,s,this.numConstants);t=r.inputs,i=r.initialState,s=r.constants;let n=[],l=[];if(null!=i){for(let t of(e.initialState=i,n=n.concat(i),this.stateSpec=[],i))this.stateSpec.push(new u.Zg({shape:t.shape}));l=l.concat(this.stateSpec)}null!=s&&(e.constants=s,n=n.concat(s),this.numConstants=s.length);let a=n[0]instanceof u.Iy;if(!a)return super.apply(t,e);{let i=[t].concat(n),s=this.inputSpec.concat(l),r=this.inputSpec;this.inputSpec=s;let a=super.apply(i,e);return this.inputSpec=r,a}}call(t,e){return(0,s.lub)(()=>{let i=null==e?null:e.mask,s=null==e?null:e.training,r=null==e?null:e.initialState;t=(0,d.nQ)(t),null==r&&(r=this.stateful?this.states_:this.getInitialState(t));let n=Array.isArray(this.cell.stateSize)?this.cell.stateSize.length:1;if(r.length!==n)throw new h.nu(`RNN Layer has ${n} state(s) but was passed ${r.length} initial state(s).`);this.unroll&&console.warn("Ignoring unroll = true for RNN layer, due to imperative backend.");let l={training:s},a=A((t,e)=>{let i=this.cell.call([t].concat(e),l);return[i[0],i.slice(1)]},t,r,this.goBackwards,i,null,this.unroll,this.returnSequences),u=a[0],o=a[1],c=a[2];this.stateful&&this.resetStates(c,s);let p=this.returnSequences?o:u;return this.returnState?[p].concat(c):p})}getInitialState(t){return(0,s.lub)(()=>{let e=s.lls(t.shape);return(e=s.Smz(e,[1,2]),e=n.dt(e),Array.isArray(this.cell.stateSize))?this.cell.stateSize.map(t=>t>1?n.Gg(e,[1,t]):e):this.cell.stateSize>1?[n.Gg(e,[1,this.cell.stateSize])]:[e]})}get trainableWeights(){return this.trainable?this.cell.trainableWeights:[]}get nonTrainableWeights(){return this.trainable?this.cell.nonTrainableWeights:this.cell.weights}setFastWeightInitDuringBuild(t){super.setFastWeightInitDuringBuild(t),null!=this.cell&&this.cell.setFastWeightInitDuringBuild(t)}getConfig(){let t=super.getConfig(),e={returnSequences:this.returnSequences,returnState:this.returnState,goBackwards:this.goBackwards,stateful:this.stateful,unroll:this.unroll};null!=this.numConstants&&(e.numConstants=this.numConstants);let i=this.cell.getConfig();return this.getClassName()===b.className&&(e.cell={className:this.cell.getClassName(),config:i}),Object.assign(Object.assign(Object.assign({},i),t),e)}static fromConfig(t,e,i={}){let s=e.cell,r=(0,C.v)(s,i);return new t(Object.assign(e,{cell:r}))}}b.className="RNN",s.m7h.registerClass(b);class f extends u.mh{}class k extends f{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,r.aI)(null==t.activation?this.DEFAULT_ACTIVATION:t.activation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,o.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,o.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,o.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=(0,d.Wf)(t),this.kernel=this.addWeight("kernel",[t[t.length-1],this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return(0,s.lub)(()=>{let i;if(2!==t.length)throw new h.nu(`SimpleRNNCell expects 2 input Tensors, got ${t.length}.`);let r=t[1];t=t[0];let l=null!=e.training&&e.training;0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=T({ones:()=>s.JpU(t),rate:this.dropout,training:l,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=T({ones:()=>s.JpU(r),rate:this.recurrentDropout,training:l,dropoutFunc:this.dropoutFunc}));let a=this.dropoutMask,u=this.recurrentDropoutMask;i=null!=a?n.AK(s.dC7(t,a),this.kernel.read()):n.AK(t,this.kernel.read()),null!=this.bias&&(i=n.a2(i,this.bias.read())),null!=u&&(r=s.dC7(r,u));let o=s.IHx(i,n.AK(r,this.recurrentKernel.read()));return null!=this.activation&&(o=this.activation.apply(o)),[o,o]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,r.GD)(this.activation),useBias:this.useBias,kernelInitializer:(0,o.Cx)(this.kernelInitializer),recurrentInitializer:(0,o.Cx)(this.recurrentInitializer),biasInitializer:(0,o.Cx)(this.biasInitializer),kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout};return Object.assign(Object.assign({},t),e)}}k.className="SimpleRNNCell",s.m7h.registerClass(k);class S extends b{constructor(t){t.cell=new k(t),super(t)}call(t,e){return(0,s.lub)(()=>{null!=this.cell.dropoutMask&&(s.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(s.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,r=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:r,initialState:n})})}static fromConfig(t,e){return new t(e)}}S.className="SimpleRNN",s.m7h.registerClass(S);class R extends f{constructor(t){if(super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",t.resetAfter)throw new h.nu("GRUCell does not support reset_after parameter set to true.");this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,r.aI)(void 0===t.activation?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=(0,r.aI)(void 0===t.recurrentActivation?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,o.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,o.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,o.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=this.units,this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){t=(0,d.Wf)(t);let e=t[t.length-1];this.kernel=this.addWeight("kernel",[e,3*this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,3*this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias?this.bias=this.addWeight("bias",[3*this.units],null,this.biasInitializer,this.biasRegularizer,!0,this.biasConstraint):this.bias=null,this.built=!0}call(t,e){return(0,s.lub)(()=>{let i,r,l;if(2!==t.length)throw new h.nu(`GRUCell expects 2 input Tensors (inputs, h, c), got ${t.length}.`);let a=null!=e.training&&e.training,u=t[1];t=t[0],0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=T({ones:()=>s.JpU(t),rate:this.dropout,training:a,count:3,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=T({ones:()=>s.JpU(u),rate:this.recurrentDropout,training:a,count:3,dropoutFunc:this.dropoutFunc}));let o=this.dropoutMask,c=this.recurrentDropoutMask;0<this.dropout&&this.dropout<1&&(t=s.dC7(t,o[0]));let p=n.AK(t,this.kernel.read());this.useBias&&(p=n.a2(p,this.bias.read())),0<this.recurrentDropout&&this.recurrentDropout<1&&(u=s.dC7(u,c[0]));let g=this.recurrentKernel.read(),[d,I]=s.Vl2(g,[2*this.units,this.units],g.rank-1),C=n.AK(u,d),[z,A,b]=s.Vl2(p,3,p.rank-1),[f,k]=s.Vl2(C,2,C.rank-1);i=this.recurrentActivation.apply(s.IHx(z,f)),r=this.recurrentActivation.apply(s.IHx(A,k));let S=n.AK(s.dC7(r,u),I);l=this.activation.apply(s.IHx(b,S));let R=s.IHx(s.dC7(i,u),s.dC7(s.IHx(1,s.W76(i)),l));return[R,R]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,r.GD)(this.activation),recurrentActivation:(0,r.GD)(this.recurrentActivation),useBias:this.useBias,kernelInitializer:(0,o.Cx)(this.kernelInitializer),recurrentInitializer:(0,o.Cx)(this.recurrentInitializer),biasInitializer:(0,o.Cx)(this.biasInitializer),kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation,resetAfter:!1};return Object.assign(Object.assign({},t),e)}}R.className="GRUCell",s.m7h.registerClass(R);class m extends b{constructor(t){0===t.implementation&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new R(t),super(t)}call(t,e){return(0,s.lub)(()=>{null!=this.cell.dropoutMask&&(s.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(s.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,r=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:r,initialState:n})})}static fromConfig(t,e){return 0===e.implmentation&&(e.implementation=1),new t(e)}}m.className="GRU",s.m7h.registerClass(m);class E extends f{constructor(t){super(t),this.DEFAULT_ACTIVATION="tanh",this.DEFAULT_RECURRENT_ACTIVATION="hardSigmoid",this.DEFAULT_KERNEL_INITIALIZER="glorotNormal",this.DEFAULT_RECURRENT_INITIALIZER="orthogonal",this.DEFAULT_BIAS_INITIALIZER="zeros",this.units=t.units,(0,p.iQ)(this.units,"units"),this.activation=(0,r.aI)(void 0===t.activation?this.DEFAULT_ACTIVATION:t.activation),this.recurrentActivation=(0,r.aI)(void 0===t.recurrentActivation?this.DEFAULT_RECURRENT_ACTIVATION:t.recurrentActivation),this.useBias=null==t.useBias||t.useBias,this.kernelInitializer=(0,o.L5)(t.kernelInitializer||this.DEFAULT_KERNEL_INITIALIZER),this.recurrentInitializer=(0,o.L5)(t.recurrentInitializer||this.DEFAULT_RECURRENT_INITIALIZER),this.biasInitializer=(0,o.L5)(t.biasInitializer||this.DEFAULT_BIAS_INITIALIZER),this.unitForgetBias=t.unitForgetBias,this.kernelRegularizer=(0,c.EC)(t.kernelRegularizer),this.recurrentRegularizer=(0,c.EC)(t.recurrentRegularizer),this.biasRegularizer=(0,c.EC)(t.biasRegularizer),this.kernelConstraint=(0,a.Ad)(t.kernelConstraint),this.recurrentConstraint=(0,a.Ad)(t.recurrentConstraint),this.biasConstraint=(0,a.Ad)(t.biasConstraint),this.dropout=g.VV([1,g.Fp([0,null==t.dropout?0:t.dropout])]),this.recurrentDropout=g.VV([1,g.Fp([0,null==t.recurrentDropout?0:t.recurrentDropout])]),this.dropoutFunc=t.dropoutFunc,this.implementation=t.implementation,this.stateSize=[this.units,this.units],this.dropoutMask=null,this.recurrentDropoutMask=null}build(t){var e;let i;t=(0,d.Wf)(t);let s=t[t.length-1];if(this.kernel=this.addWeight("kernel",[s,4*this.units],null,this.kernelInitializer,this.kernelRegularizer,!0,this.kernelConstraint),this.recurrentKernel=this.addWeight("recurrent_kernel",[this.units,4*this.units],null,this.recurrentInitializer,this.recurrentRegularizer,!0,this.recurrentConstraint),this.useBias){if(this.unitForgetBias){let t=this.biasInitializer,s=this.units;i=new((e=class extends o.m7{apply(e,i){let r=t.apply([s]),l=new o.M6().apply([s]),a=t.apply([2*s]);return n.GZ(n.GZ(r,l),a)}}).className="CustomInit",e)}else i=this.biasInitializer;this.bias=this.addWeight("bias",[4*this.units],null,i,this.biasRegularizer,!0,this.biasConstraint)}else this.bias=null;this.built=!0}call(t,e){return(0,s.lub)(()=>{let i,r,l,a;let u=null!=e.training&&e.training;if(3!==t.length)throw new h.nu(`LSTMCell expects 3 input Tensors (inputs, h, c), got ${t.length}.`);let o=t[1],c=t[2];t=t[0],0<this.dropout&&this.dropout<1&&null==this.dropoutMask&&(this.dropoutMask=T({ones:()=>s.JpU(t),rate:this.dropout,training:u,count:4,dropoutFunc:this.dropoutFunc})),0<this.recurrentDropout&&this.recurrentDropout<1&&null==this.recurrentDropoutMask&&(this.recurrentDropoutMask=T({ones:()=>s.JpU(o),rate:this.recurrentDropout,training:u,count:4,dropoutFunc:this.dropoutFunc}));let p=this.dropoutMask,g=this.recurrentDropoutMask;0<this.dropout&&this.dropout<1&&(t=s.dC7(t,p[0]));let d=n.AK(t,this.kernel.read());0<this.recurrentDropout&&this.recurrentDropout<1&&(o=s.dC7(o,g[0])),d=s.IHx(d,n.AK(o,this.recurrentKernel.read())),this.useBias&&(d=n.a2(d,this.bias.read()));let[I,C,z,A]=s.Vl2(d,4,d.rank-1);i=this.recurrentActivation.apply(I),r=this.recurrentActivation.apply(C),l=s.IHx(s.dC7(r,c),s.dC7(i,this.activation.apply(z))),a=this.recurrentActivation.apply(A);let b=s.dC7(a,this.activation.apply(l));return[b,b,l]})}getConfig(){let t=super.getConfig(),e={units:this.units,activation:(0,r.GD)(this.activation),recurrentActivation:(0,r.GD)(this.recurrentActivation),useBias:this.useBias,kernelInitializer:(0,o.Cx)(this.kernelInitializer),recurrentInitializer:(0,o.Cx)(this.recurrentInitializer),biasInitializer:(0,o.Cx)(this.biasInitializer),unitForgetBias:this.unitForgetBias,kernelRegularizer:(0,c.SG)(this.kernelRegularizer),recurrentRegularizer:(0,c.SG)(this.recurrentRegularizer),biasRegularizer:(0,c.SG)(this.biasRegularizer),activityRegularizer:(0,c.SG)(this.activityRegularizer),kernelConstraint:(0,a.xF)(this.kernelConstraint),recurrentConstraint:(0,a.xF)(this.recurrentConstraint),biasConstraint:(0,a.xF)(this.biasConstraint),dropout:this.dropout,recurrentDropout:this.recurrentDropout,implementation:this.implementation};return Object.assign(Object.assign({},t),e)}}E.className="LSTMCell",s.m7h.registerClass(E);class N extends b{constructor(t){0===t.implementation&&console.warn("`implementation=0` has been deprecated, and now defaults to `implementation=1`. Please update your layer call."),t.cell=new E(t),super(t)}call(t,e){return(0,s.lub)(()=>{null!=this.cell.dropoutMask&&(s.B90(this.cell.dropoutMask),this.cell.dropoutMask=null),null!=this.cell.recurrentDropoutMask&&(s.B90(this.cell.recurrentDropoutMask),this.cell.recurrentDropoutMask=null);let i=null==e?null:e.mask,r=null==e?null:e.training,n=null==e?null:e.initialState;return super.call(t,{mask:i,training:r,initialState:n})})}static fromConfig(t,e){return 0===e.implmentation&&(e.implementation=1),new t(e)}}N.className="LSTM",s.m7h.registerClass(N);class D extends f{constructor(t){super(t),this.cells=t.cells}get stateSize(){let t=[];for(let e of this.cells.slice().reverse())Array.isArray(e.stateSize)?t.push(...e.stateSize):t.push(e.stateSize);return t}call(t,e){return(0,s.lub)(()=>{let i;let s=t.slice(1),r=[];for(let t of this.cells.slice().reverse())Array.isArray(t.stateSize)?r.push(s.splice(0,t.stateSize.length)):r.push(s.splice(0,1));r.reverse();let n=[];for(let l=0;l<this.cells.length;++l){let a=this.cells[l];s=r[l],i=0===l?[t[0]].concat(s):[i[0]].concat(s),i=a.call(i,e),n.push(i.slice(1))}for(let t of(s=[],n.slice().reverse()))s.push(...t);return[i[0]].concat(s)})}build(t){let e;(0,d.XO)(t)&&(t=t[0]),this.cells.forEach((i,s)=>{(0,l.f4)(`RNNCell_${s}`,()=>{i.build(t),e=Array.isArray(i.stateSize)?i.stateSize[0]:i.stateSize,t=[t[0],e]})}),this.built=!0}getConfig(){let t=super.getConfig(),e=this.cells.map(t=>({className:t.getClassName(),config:t.getConfig()}));return Object.assign(Object.assign({},t),{cells:e})}static fromConfig(t,e,i={}){let s=[];for(let t of e.cells)s.push((0,C.v)(t,i));return new t({cells:s})}get trainableWeights(){if(!this.trainable)return[];let t=[];for(let e of this.cells)t.push(...e.trainableWeights);return t}get nonTrainableWeights(){let t=[];for(let e of this.cells)t.push(...e.nonTrainableWeights);if(!this.trainable){let e=[];for(let t of this.cells)e.push(...t.trainableWeights);return e.concat(t)}return t}getWeights(){let t=[];for(let e of this.cells)t.push(...e.weights);return(0,I.FQ)(t)}setWeights(t){let e=[];for(let i of this.cells){let s=i.weights.length,r=t.splice(s);for(let t=0;t<i.weights.length;++t)e.push([i.weights[t],r[t]])}(0,I.zb)(e)}}function T(t){let{ones:e,rate:i,training:r=!1,count:l=1,dropoutFunc:a}=t,u=()=>null!=a?a(e(),i):n.rv(e(),i),h=()=>n.KC(u,e,r);if(!l||l<=1)return s.CnY(h().clone());let o=Array(l).fill(void 0).map(h);return o.map(t=>s.CnY(t.clone()))}D.className="StackedRNNCells",s.m7h.registerClass(D)}}]);