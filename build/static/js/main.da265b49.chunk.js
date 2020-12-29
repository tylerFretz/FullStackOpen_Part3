(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t(1),r=t(14),a=t.n(r),u=t(3),i=t(43),s=function(e){var n=e.value,t=e.onChange;return Object(o.jsxs)("div",{className:"filter",children:["filter by name: ",Object(o.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.onSubmit,t=e.name,c=e.number,r=e.onNameChange,a=e.onNumberChange;return Object(o.jsxs)("form",{onSubmit:n,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:t,onChange:r})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:c,onChange:a,maxLength:"14"})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){var n=e.persons,t=e.removePerson;return Object(o.jsx)(o.Fragment,{children:n.map((function(e){return Object(o.jsxs)("p",{children:[Object(o.jsxs)("span",{children:[e.name," \xa0"]}),Object(o.jsxs)("span",{children:[e.number," \xa0"]}),Object(o.jsx)("span",{children:Object(o.jsx)("button",{onClick:function(){return t(e)},children:"delete"})})]},e.id)}))})},b=t(4),j=t.n(b),f="/api/phonebook",h=function(){return j.a.get(f).then((function(e){return e.data}))},m=function(e){return j.a.post(f,e).then((function(e){return e.data}))},p=function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return j.a.delete("".concat(f,"/").concat(e))},v=function(e){var n=e.message,t=e.onClose;return null===n?null:Object(o.jsxs)("div",{className:n.type,children:[Object(o.jsx)("span",{children:Object(o.jsx)("button",{onClick:function(){return t()},children:"X"})}),Object(o.jsx)("span",{children:n.body}),Object(o.jsx)("br",{})]})},x=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),b=Object(u.a)(a,2),j=b[0],f=b[1],x=Object(c.useState)(""),g=Object(u.a)(x,2),y=g[0],w=g[1],C=Object(c.useState)(""),S=Object(u.a)(C,2),k=S[0],N=S[1],E=Object(c.useState)(null),I=Object(u.a)(E,2),L=I[0],P=I[1];Object(c.useEffect)((function(){h().then((function(e){return r(e)})).catch((function(e){return console.log(e)}))}),[]),Object(c.useEffect)((function(){setTimeout((function(){P(null)}),1e4)}),[L]);var T=function(e){var n=window.confirm("".concat(e.name," is already added to the phonebook, update the old number with a new one?")),o=t.filter((function(e){return e.name===y})).map((function(e){return e.id}));n?p(o,e).then((function(n){r(t.map((function(e){return e.id!==o?e:n}))),P({body:"".concat(e.name,"'s number was updated"),type:"info"})})).catch((function(n){r(t.filter((function(n){return n.id!==e.id}))),console.log(n),P({body:"".concat(n.response.data.error),type:"error"}),console.log(n.response.data)})):alert("The contact was not updated")},A=j?t.filter((function(e){return-1!==e.name.toLowerCase().search(j.toLowerCase())})):t;return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{children:"Phonebook"}),Object(o.jsx)(v,{message:L,onClose:function(e){return P(null)}}),Object(o.jsx)(s,{value:j,onChange:function(e){return f(e.target.value)}}),Object(o.jsx)("h3",{children:"Add a new contact"}),Object(o.jsx)(d,{onSubmit:function(e){e.preventDefault();var n={name:y,number:k};t.some((function(e){return e.name===y}))?T(n):(m(n).then((function(e){console.log(e),r(t.concat(n)),P({body:"Added ".concat(n.name),type:"info"})})).catch((function(e){console.log(e),P({body:"".concat(e.response.data.error),type:"error"}),console.log(e.response.data)})),w(""),N(""))},name:y,number:k,onNameChange:function(e){return w(e.target.value)},onNumberChange:function(e){return N(new i.a("US").input(e.target.value))}}),Object(o.jsx)("h3",{children:"Numbers"}),Object(o.jsx)(l,{persons:A,removePerson:function(e){window.confirm("Delete ".concat(e.name," ?"))?O(e.id).then((function(n){r(t.filter((function(n){return n.id!==e.id}))),P({body:"Information of '".concat(e.name,"' has been removed from server"),type:"info"})})).catch((function(n){r(t.filter((function(n){return n.id!==e.id}))),P({body:"Information of '".concat(e.name,"' has already been removed from server"),type:"error"}),console.log(n)})):alert("The contact was not deleted")}})]})};t(37);a.a.render(Object(o.jsx)(x,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.da265b49.chunk.js.map