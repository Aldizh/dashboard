(this.webpackJsonpdashboard=this.webpackJsonpdashboard||[]).push([[0],{1949:function(e,t,a){},1951:function(e,t,a){},1952:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(17),i=a.n(r),s=(a(340),a(2003)),o=a(50),l=a(20),d=a(1954),j=a(12),b=a(1998),u=a(2002),h=a(100),p=a(129),O=a(130),m=a(138),f=a(137),x=a(179),g=a(2),y={"Time Series (Daily)":{}},v=function(e,t){return Number(100/t*e)},S=function(e){return e["Time Series (Daily)"]?Object.keys(e["Time Series (Daily)"]):[]},w=function(e){return e["Time Series (Daily)"]?Object.values(e["Time Series (Daily)"]):[]},C=function(e){Object(m.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={dataPoints:[],spyDataPoints:[]},e}return Object(O.a)(a,[{key:"componentDidMount",value:function(){for(var e=this.props,t=e.data,a=void 0===t?y:t,n=e.spyData,c=[],r=S(a),i=w(a),s=r.length-1,o=i[s]?i[s]["4. close"]:0,l=s;l>0;l--)c.push({x:new Date(r[l]),y:v(i[l]["4. close"],o)});var d=[],j=S(n),b=w(n),u=b[s]?b[s]["4. close"]:0;for(l=s;l>0;l--)d.push({x:new Date(j[l]),y:v(b[l]["4. close"],u)});this.setState({dataPoints:c,spyDataPoints:d}),this.chart.render()}},{key:"componentWillUnmount",value:function(){this.chart=null}},{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=(t.spyData,t.symbol),c=S(a),r={theme:"light2",animationEnabled:!0,title:{text:"Daily stock Price of ".concat(n," vs SPY")},axisY:{title:"Price in USD",prefix:"$"},axisX:{title:"Day",interVal:1,interValType:"day",labelFormatter:function(e){return x.a.formatDate(e.value,"DD MMM")}},toolTip:{shared:!0},data:[{type:"spline",name:"".concat(n),showInLegend:!0,xValueType:"dateTime",xValueFormatString:"DD MMM YYYY",yValueFormatString:"$##.00",dataPoints:this.state.dataPoints},{type:"spline",name:"SPY",showInLegend:!0,xValueType:"dateTime",xValueFormatString:"DD MMM YYYY",yValueFormatString:"$##.00",dataPoints:this.state.spyDataPoints}],navigator:{slider:{minimum:new Date(c[0]),maximum:new Date(c[c.length-1])}}};return Object(g.jsx)("div",{children:Object(g.jsx)(x.b,{containerProps:{width:"100%",height:"450px",margin:"auto"},options:r,onRef:function(t){return e.chart=t}})})}}]),a}(c.a.Component),k=a(180),T=a.n(k),P=a(285),E=a(31),D=a(286),_=a.n(D),F={data:{"Meta Data":{symbol:"C"},"Time Series (Daily)":{}}},N=function(e,t){switch(t.type){case"FETCH_INIT":return Object(E.a)(Object(E.a)({},e),{},{isLoading:!0,isError:!1});case"FETCH_SUCCESS":return Object(E.a)(Object(E.a)({},e),{},{isLoading:!1,isError:!1,data:t.payload});case"FETCH_FAILURE":return Object(E.a)(Object(E.a)({},e),{},{isLoading:!1,isError:!0});default:throw new Error}},B=function(e){var t=Object(n.useState)(e),a=Object(j.a)(t,2),c=a[0],r=a[1],i=Object(n.useReducer)(N,{isLoading:!1,isError:!1,data:F}),s=Object(j.a)(i,2),o=s[0],l=s[1];Object(n.useEffect)((function(){(function(){var e=Object(P.a)(T.a.mark((function e(){var t;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l({type:"FETCH_INIT"}),e.prev=1,e.next=4,_()(c);case 4:t=e.sent,l({type:"FETCH_SUCCESS",payload:t}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),l({type:"FETCH_FAILURE"});case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(){return e.apply(this,arguments)}})()()}),[c]);return Object(E.a)(Object(E.a)({},o),{},{doFetch:function(e){r(e)}})},M="1PXX8A1J2QJQFTBP",I=function(e){return"".concat("https://www.alphavantage.co/query","?function=").concat("TIME_SERIES_DAILY_ADJUSTED","&symbol=").concat(e,"&interval=Daily&apikey=").concat(M)};var A=function(){var e,t=Object(n.useState)("JPM"),a=Object(j.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)([]),s=Object(j.a)(i,2),o=(s[0],s[1]),l=B(I(c)),d=l.data,p=l.isLoading,O=l.isError,m=l.doFetch,f=B(I("SPY")),x=B(function(e){return"".concat("https://www.alphavantage.co/query","?function=").concat("OVERVIEW","&symbol=").concat(e,"&apikey=").concat(M)}(c)).data.data,y=x.Name,v=x.Exchange,S=x.Sector,w=x.MarketCapitalization,k=void 0===w?0:w;return Object(n.useEffect)((function(){var e=0,t=new Date;!p&&t-e>=2e3&&(m(I(c)),e=t)}),[c,m]),Object(n.useEffect)((function(){o(function(e){var t=[],a=e["Meta Data"];if(!a)return[];for(var n=0,c=Object.keys(a);n<c.length;n++){var r=c[n];t.push("".concat(r," - ").concat(a[r]))}return t}(d))}),[d]),Object(g.jsxs)(n.Fragment,{children:[Object(g.jsxs)("form",{onSubmit:function(e){m(I(c)),e.preventDefault()},children:[Object(g.jsx)("input",{type:"text",value:c,onChange:function(e){return r(e.target.value)}}),Object(g.jsx)("button",{type:"submit",children:"Search"})]}),O&&Object(g.jsx)("div",{children:"Something went wrong ..."}),p?Object(g.jsx)("div",{children:"Loading ..."}):Object(g.jsxs)("div",{children:[Object(g.jsx)("p",{children:d["Meta Data"]&&d["Meta Data"].symbol}),Object(g.jsx)("div",{style:{margin:"10px auto",width:"70%"},children:Object(g.jsx)(b.a,{variant:"outlined",children:Object(g.jsxs)(u.a,{children:[Object(g.jsx)(h.a,{color:"textPrimary",gutterBottom:!0,children:y}),Object(g.jsxs)(h.a,{color:"textSecondary",gutterBottom:!0,children:["Exchange: ",v]}),Object(g.jsxs)(h.a,{color:"textSecondary",gutterBottom:!0,children:["Sector: ",S]}),Object(g.jsxs)(h.a,{color:"textSecondary",gutterBottom:!0,children:["Market CAP: $",(e=k,e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))]})]})})}),Object(g.jsx)(C,{symbol:c,data:d.data,spyData:f.data.data})]})]})},L=a(2027),R=a(2022),H=a(2028),Y=(a(365),[{type:"Onboard Contractor",status:"Pending",tasks:"2 of 4",date:"2014-04-18",name1:"Create Zendesk Ticket",name2:"LDAP Access",percent:50},{type:"Onboard Employee",status:"Done",tasks:"1 of 3",date:"2014-04-21",name1:"Equipment Setup",name2:"Microsoft Training",percent:100},{type:"Onboard Contractor",status:"Error",tasks:"3 of 3",date:"2014-08-09",name1:"Create Zendesk Ticket",name2:"LDAP Access",percent:25},{type:"Terminate Contractor",status:"Done",tasks:"2 of 4",date:"2014-04-24",name1:"Create Zendesk Ticket",name2:"LDAP Access",percent:100},{type:"Terminate Contractor",status:"Pending",tasks:"1 of 4",date:"2014-04-26",name1:"Create Zendesk Ticket",name2:"LDAP Access",percent:90}]),q=function(e,t){var a=e.name1;return t>1&&(a=e.name2),Object(g.jsxs)(L.a,{columns:4,children:[Object(g.jsx)(L.a.Column,{children:Object(g.jsxs)("span",{children:[t,": ",a]})}),Object(g.jsx)(L.a.Column,{children:Object(g.jsxs)("span",{children:["Status: ",e.status]})}),Object(g.jsx)(L.a.Column,{children:Object(g.jsxs)("span",{children:["Percent Complete: ",e.percent]})}),Object(g.jsx)(L.a.Column,{children:Object(g.jsx)("span",{children:Object(g.jsx)("button",{children:"Update"})})})]})},V=function(){var e=Object(n.useState)([]),t=Object(j.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)([]),i=Object(j.a)(r,2),s=i[0],o=i[1];Object(n.useEffect)((function(){var e=function(e,t){var n=[Object(g.jsxs)(R.a.Row,{onClick:function(){return function(e){var t=a,n=t.includes(e)?t.filter((function(t){return t!==e})):t.concat(e);c(n)}(t)},children:[Object(g.jsx)(R.a.Cell,{children:e.type}),Object(g.jsx)(R.a.Cell,{children:e.status}),Object(g.jsx)(R.a.Cell,{children:e.date}),Object(g.jsx)(R.a.Cell,{children:e.tasks})]},"row-data-"+t)];return a.includes(t)&&n.push(Object(g.jsx)(R.a.Row,{children:Object(g.jsx)(R.a.Cell,{colSpan:"5",children:l(e)})},"row-expanded-"+t)),n},t=[];Y.forEach((function(a,n){var c=e(a,n);t=t.concat(c)})),o(t)}),[a]);var l=function(e){return Object(g.jsxs)(H.a,{basic:!0,children:[Object(g.jsx)("h2",{children:"2 Active Tasks"}),q(e,1),q(e,2)]})};return Object(g.jsxs)(R.a,{selectable:!0,children:[Object(g.jsx)(R.a.Header,{children:Object(g.jsxs)(R.a.Row,{children:[Object(g.jsx)(R.a.HeaderCell,{children:"Activity Type"}),Object(g.jsx)(R.a.HeaderCell,{children:"Overall Status"}),Object(g.jsx)(R.a.HeaderCell,{children:"Date Created"}),Object(g.jsx)(R.a.HeaderCell,{children:"Tasks Completed"})]})}),Object(g.jsx)(R.a.Body,{children:s})]})},z=a(2020),U=a(19),J=a(2008),W=a(2023),$=a(2009),Z=function(e,t){switch(t.type){case"update_chips":return Object(E.a)(Object(E.a)({},e),{},{chips:t.data});case"update_members":return Object(E.a)(Object(E.a)({},e),{},{members:t.data});default:return e}},X=Object(n.createContext)(),Q=function(e){var t=e.initialState,a=e.children;return Object(g.jsx)(X.Provider,{value:Object(n.useReducer)(Z,t),children:a})},G=function(){return Object(n.useContext)(X)},K=(a(280),Object(s.a)((function(e){return{root:{"& .MuiTextField-root":{margin:e.spacing(1),width:"25ch"}}}}))),ee=function(e){var t=Object(n.useState)(""),a=Object(j.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)(0),s=Object(j.a)(i,2),o=s[0],l=s[1],d=Object(n.useState)({code:""}),b=Object(j.a)(d,2),u=b[0],h=b[1],p=Object(n.useState)({code:""}),O=Object(j.a)(p,2),m=O[0],f=O[1],x=Object(n.useState)({code:""}),y=Object(j.a)(x,2),v=y[0],S=y[1],w=e.countriesReference,C=e.currenciesReference,k=e.membershipTypesReference,T=G(),P=Object(j.a)(T,2),E=P[0],D=P[1],_=E.members,F=function(e,t){switch(t||e.target.id){case"name":r(e.target.value);break;case"country":f(Object(U.find)(Object(U.propEq)("code",e.target.value),w));break;case"currency":S(Object(U.find)(Object(U.propEq)("code",e.target.value),C));break;case"annual_fee":l(e.target.value);break;case"membership_type":h(Object(U.find)(Object(U.propEq)("code",e.target.value),k))}},N=K();return Object(g.jsxs)("div",{children:[Object(g.jsx)("h3",{children:"Add new member"}),Object(g.jsxs)("form",{className:N.root,noValidate:!0,autoComplete:"off",children:[Object(g.jsx)(W.a,{label:"Name",className:"nameField",value:c,onChange:function(e){return F(e,"name")},helperText:"Please select a name",margin:"normal"}),Object(g.jsx)(W.a,{select:!0,label:"Country",placeholder:"Country",className:"countryField",value:m.code,onChange:function(e){return F(e,"country")},helperText:"Please select a country",margin:"normal",children:w.map((function(e){return Object(g.jsx)(J.a,{id:"".concat(e.code,"_cntry"),value:e.code,children:e.description},e.code)}))}),Object(g.jsx)(W.a,{select:!0,id:"membership",label:"Membership",placeholder:"Membership",className:"membershipField",value:u.code,onChange:function(e){return F(e,"membership_type")},helperText:"Please select membership type",margin:"normal",children:k.map((function(e){return Object(g.jsx)(J.a,{id:"".concat(e.code,"_membership"),value:e.code,children:e.description},e.code)}))}),Object(g.jsx)(W.a,{select:!0,label:"Currency",placeholder:"Currency",className:"currencyField",value:v.code,onChange:function(e){return F(e,"currency")},helperText:"Please select your currency",margin:"normal",children:C.map((function(e){return Object(g.jsx)(J.a,{id:"".concat(e.code,"_currency"),value:e.code,children:e.description},e.code)}))}),Object(g.jsx)(W.a,{placeholder:"Annual Fee",label:"Annual Fee",helperText:"Please select annual fee",className:"annualFeeField",onChange:function(e){return F(e,"annual_fee")},disabled:!1}),Object(g.jsx)(W.a,{id:"from_date",label:"From Date",placeholder:"From Date",type:"date",helperText:"Please select from date",defaultValue:"2019-03-01",className:"datePickerField",InputLabelProps:{shrink:!0}})]}),Object(g.jsx)($.a,{variant:"contained",color:"primary",onClick:function(e){e.preventDefault();var t=_;t.push({name:c,country:m.description,membership_type:u.description,currency:v.description,annual_fee:o,from_date:"30th Jun, 2016",to_date:"30th Jun, 2017"}),D({type:"update_members",data:t}),r(""),l(0),h(""),f(""),S("")},className:"addButton",children:"Add"})]})},te=a(131),ae=a(5),ne=a(10),ce=a(2015),re=a(2016),ie=a(2012),se=a(2014),oe=a(2010),le=a(2026),de=a(2011),je=a(2030),be=a(2013),ue=a(2025),he=a(1956),pe=a(2031),Oe=a(2017),me=a(2018),fe=a(304),xe=a.n(fe),ge=a(305),ye=a.n(ge),ve=function(e){return new Date(e).toLocaleDateString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"})},Se=function(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0},we=function(e,t,a){var n=function(e,t){return"desc"===e?function(e,a){return Se(e,a,t)}:function(e,a){return-Se(e,a,t)}}(t,a),c=e.map((function(e,t){return[e,t]}));return c.sort((function(e,t){var a=n(e[0],t[0]);return 0!==a?a:e[1]-t[1]})),c.map((function(e){return e[0]}))},Ce=[{id:"name",numeric:!1,disablePadding:!0,label:"Name"},{id:"membershipType",numeric:!1,disablePadding:!1,label:"Membership Type"},{id:"country",numeric:!1,disablePadding:!1,label:"Country"},{id:"currency",numeric:!1,disablePadding:!1,label:"Currency"},{id:"annual_fee",numeric:!0,disablePadding:!1,label:"Fee"},{id:"from",numeric:!1,disablePadding:!1,label:"From"},{id:"to",numeric:!1,disablePadding:!1,label:"To"}],ke=function(e){var t=e.classes,a=e.onSelectAllClick,n=e.order,c=e.orderBy,r=e.numSelected,i=e.rowCount,s=e.onRequestSort;return Object(g.jsx)(oe.a,{children:Object(g.jsxs)(de.a,{children:[Object(g.jsx)(ie.a,{padding:"checkbox",children:Object(g.jsx)(ue.a,{indeterminate:r>0&&r<i,checked:i>0&&r===i,onChange:a,inputProps:{"aria-label":"select all desserts"}})}),Ce.map((function(e){return Object(g.jsx)(ie.a,{align:e.numeric?"right":"left",padding:e.disablePadding?"none":"default",sortDirection:c===e.id&&n,children:Object(g.jsxs)(je.a,{active:c===e.id,direction:c===e.id?n:"asc",onClick:(a=e.id,function(e){s(e,a)}),children:[e.label,c===e.id?Object(g.jsx)("span",{className:t.visuallyHidden,children:"desc"===n?"sorted descending":"sorted ascending"}):null]})},e.id);var a}))]})})},Te=Object(s.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(ne.e)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}})),Pe=function(e){var t=Te(),a=e.rows,n=e.selected,c=e.setSelected,r=e.dispatch,i=n.length;return Object(g.jsxs)(be.a,{className:Object(ae.a)(t.root,Object(te.a)({},t.highlight,i>0)),children:[i>0?Object(g.jsxs)(h.a,{className:t.title,color:"inherit",variant:"subtitle1",component:"div",children:[i," selected"]}):Object(g.jsx)(h.a,{className:t.title,variant:"h6",id:"tableTitle",component:"div",children:"Memberships"}),i>0?Object(g.jsx)(pe.a,{title:"Delete",children:Object(g.jsx)(he.a,{"aria-label":"delete",onClick:function(){var e=a.filter((function(e,t){return n[t]!==e.name}));r({type:"update_members",data:e}),c([])},children:Object(g.jsx)(xe.a,{})})}):Object(g.jsx)(pe.a,{title:"Filter list",children:Object(g.jsx)(he.a,{"aria-label":"filter list",children:Object(g.jsx)(ye.a,{})})})]})},Ee=Object(s.a)((function(e){return{root:{width:"100%"},paper:{width:"100%",marginBottom:e.spacing(2)},table:{minWidth:750},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));var De=function(){var e=Ee(),t=c.a.useState("asc"),a=Object(j.a)(t,2),n=a[0],r=a[1],i=c.a.useState("calories"),s=Object(j.a)(i,2),o=s[0],l=s[1],b=c.a.useState([]),u=Object(j.a)(b,2),h=u[0],p=u[1],O=c.a.useState(0),m=Object(j.a)(O,2),f=m[0],x=m[1],y=c.a.useState(!1),v=Object(j.a)(y,2),S=v[0],w=v[1],C=c.a.useState(10),k=Object(j.a)(C,2),T=k[0],P=k[1],E=G(),D=Object(j.a)(E,2),_=D[0],F=D[1],N=_.members,B=T-Math.min(T,N.length-f*T);return Object(g.jsxs)("div",{className:e.root,children:[Object(g.jsxs)(d.a,{className:e.paper,children:[Object(g.jsx)(Pe,{rows:N,selected:h,setSelected:p,dispatch:F}),Object(g.jsx)(se.a,{children:Object(g.jsxs)(ce.a,{className:e.table,"aria-labelledby":"tableTitle",size:S?"small":"medium","aria-label":"enhanced table",children:[Object(g.jsx)(ke,{classes:e,numSelected:h.length,order:n,orderBy:o,onSelectAllClick:function(e){if(e.target.checked){var t=N.map((function(e){return e.name}));p(t)}else p([])},onRequestSort:function(e,t){r(o===t&&"asc"===n?"desc":"asc"),l(t)},rowCount:N.length}),Object(g.jsxs)(re.a,{children:[we(N,n,o).slice(f*T,f*T+T).map((function(e,t){var a,n=(a=e.name,-1!==h.indexOf(a)),c="enhanced-table-checkbox-".concat(t);return Object(g.jsxs)(de.a,{hover:!0,onClick:function(t){return function(e,t){var a=h.indexOf(t),n=[];-1===a?n=n.concat(h,t):0===a?n=n.concat(h.slice(1)):a===h.length-1?n=n.concat(h.slice(0,-1)):a>0&&(n=n.concat(h.slice(0,a),h.slice(a+1))),p(n)}(0,e.name)},role:"checkbox","aria-checked":n,tabIndex:-1,selected:n,children:[Object(g.jsx)(ie.a,{padding:"checkbox",children:Object(g.jsx)(ue.a,{checked:n,inputProps:{"aria-labelledby":c}})}),Object(g.jsx)(ie.a,{component:"th",id:c,scope:"row",padding:"none",children:e.name}),Object(g.jsx)(ie.a,{align:"right",children:e.membership_type}),Object(g.jsx)(ie.a,{align:"right",children:e.country}),Object(g.jsx)(ie.a,{align:"right",children:e.currency}),Object(g.jsx)(ie.a,{align:"right",children:e.annual_fee}),Object(g.jsx)(ie.a,{align:"right",children:ve(e.from_date)}),Object(g.jsx)(ie.a,{align:"right",children:ve(e.to_date)})]},e.name)})),B>0&&Object(g.jsx)(de.a,{style:{height:(S?33:53)*B},children:Object(g.jsx)(ie.a,{colSpan:6})})]})]})}),Object(g.jsx)(le.a,{rowsPerPageOptions:[5,10],component:"div",count:N.length,rowsPerPage:T,page:f,onChangePage:function(e,t){x(t)},onChangeRowsPerPage:function(e){P(parseInt(e.target.value,10)),x(0)}})]}),Object(g.jsx)(Oe.a,{control:Object(g.jsx)(me.a,{checked:S,onChange:function(e){w(e.target.checked)}}),label:"Dense padding"})]})},_e=(a(671),function(e){var t=e.style,a=void 0===t?{position:"absolute",right:"5px",bottom:"15px",paddingRight:"4px",enableBackground:"new 0 0 451 451"}:t,n=(e.fill,e.width),c=void 0===n?"15px":n,r=e.height,i=void 0===r?"20px":r;e.className,e.viewBox;return Object(g.jsx)("svg",{version:"1.1",id:"Capa_1",x:"0px",y:"0px",width:c,height:i,viewBox:"0 0 451 451",style:a,children:Object(g.jsx)("g",{children:Object(g.jsx)("path",{d:"M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3 s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4 C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3 s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"})})})}),Fe=function(e){var t=e.searchBy,a=e.searchText,n=e.handleSearch;return Object(g.jsxs)("div",{className:"searchBox",children:[Object(g.jsx)("input",{type:"text",placeholder:"".concat(t," Search"),value:a,onChange:function(e){return n(e.target.value)}}),Object(g.jsx)(_e,{})]})},Ne=a(2032),Be={textAlign:"right",marginBottom:5,paddingRight:"10px !important"},Me={chip:{backgroundColor:"#f5f5f5"},label:{fontSize:10},img:{paddingLeft:3}},Ie=function(e,t){if(!e.length)return t;var a=[];return e.forEach((function(e){var n=Object(U.find)(Object(U.propEq)(e.filterBy,e.code),t)||Object(U.find)(Object(U.propEq)(e.filterBy,e.filterText),t);n&&a.push(n)})),a},Ae=function(e){var t=e.members,a=G(),n=Object(j.a)(a,2),r=n[0],i=n[1],s=r.chips,o=void 0===s?[]:s,l=function(e){var a=o,n=a.findIndex((function(t){return e.code===t.code}));-1===n?a.push(e):a.splice(n,1),i({type:"update_chips",data:a}),i({type:"update_members",data:Ie(a,t)})};return Object(g.jsx)(c.a.Fragment,{children:Object(g.jsxs)("div",{className:"col-1-1 tableHeader",children:[Object(g.jsx)("div",{className:"toolbar",children:Object(g.jsx)("div",{className:"wrapper",children:o.map((function(e){return Object(g.jsx)(Ne.a,{label:e.filterText,onClick:function(){l(e)},className:"memberChip",children:Object(g.jsx)("img",{style:Me.img,src:"/images/close-circle.png",alt:"Remove Chip Icon",onTouchTap:function(){l(e)}})},e.code)}))})}),Object(g.jsx)("div",{className:"col-1-4",style:Object.assign({},Be),children:Object(g.jsx)($.a,{label:"Add",color:"primary",style:{marginRight:25}})})]})})},Le=a(306),Re=a(6),He=a(2007),Ye=a(1955),qe=a(2019),Ve=function(e,t){if(!e.length)return t;var a=[];return e.forEach((function(e){var n=Object(U.find)(Object(U.propEq)(e.filterBy,e.code),t)||Object(U.find)(Object(U.propEq)(e.filterBy,e.filterText),t);n&&a.push(n)})),a},ze=Object(Re.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper}}}))((function(e){var t=e.classes,a=e.filterFacets,c=e.members,r=e.filterBy,i=e.isIchecked,s=Object(n.useState)({checked:[0]}),o=Object(j.a)(s,2),l=o[0],d=o[1],b=G(),u=Object(j.a)(b,2),h=u[0].chips,p=u[1],O=function(e,t){return function(){var a=l.checked,n=a.indexOf(e.code),r=Object(Le.a)(a);-1===n?r.push(e.code):r.splice(n,1),d({checked:r}),function(e){var t=h,a=t.findIndex((function(t){return e.code===t.code}));-1===a?t.push(e):t.splice(a,1),p({type:"update_chips",data:t}),p({type:"update_members",data:Ve(t,c)})}({filterBy:t,filterText:e.description,code:e.code})}};return Object(g.jsx)(He.a,{className:t.root,children:a.map((function(e){return Object(g.jsxs)(Ye.a,{dense:!0,button:!0,onClick:O(e,r),children:[Object(g.jsx)(ue.a,{checked:i(e.description),tabIndex:-1,disableRipple:!0}),Object(g.jsx)(qe.a,{primary:"(".concat(e.code,") ").concat(e.description)})]},"#".concat(e.code))}))})}));function Ue(){return(Ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Je(e,t){if(null==e)return{};var a,n,c=function(e,t){if(null==e)return{};var a,n,c={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(c[a]=e[a]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}var We=n.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),$e=n.createElement("path",{d:"M24 24H0V0h24v24z",fill:"none"});function Ze(e,t){var a=e.title,c=e.titleId,r=Je(e,["title","titleId"]);return n.createElement("svg",Ue({fill:"#000000",height:24,viewBox:"0 0 24 24",width:24,xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},r),a?n.createElement("title",{id:c},a):null,We,$e)}var Xe=n.forwardRef(Ze);a.p;function Qe(){return(Qe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function Ge(e,t){if(null==e)return{};var a,n,c=function(e,t){if(null==e)return{};var a,n,c={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(c[a]=e[a]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}var Ke=n.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),et=n.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"});function tt(e,t){var a=e.title,c=e.titleId,r=Ge(e,["title","titleId"]);return n.createElement("svg",Qe({fill:"#000000",height:24,viewBox:"0 0 24 24",width:24,xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":c},r),a?n.createElement("title",{id:c},a):null,Ke,et)}var at=n.forwardRef(tt),nt=(a.p,a(54)),ct=a.n(nt),rt=function(e){var t=function(){for(var e=[],t=0;t<10;t++)e.push({id:t,name:ct.a.name.findName(),country:ct.a.address.country(),currency:ct.a.finance.currencySymbol(),annual_fee:ct.a.random.number(),from_date:"".concat(ct.a.date.past()),to_date:"".concat(ct.a.date.future()),membership_type:"Basic"});var a=[],n=[];return e.forEach((function(e){Object(U.find)(Object(U.propEq)("code",e.currency))(a)||a.push({code:e.currency,description:e.currency}),Object(U.find)(Object(U.propEq)("code",e.country))(n)||n.push({code:e.country,description:e.country})})),[e,n,a,[{code:"B",description:"Basic"}],[{filterBy:"membership_type",filterText:"Basic",code:"B"}]]}(),a=Object(j.a)(t,5),c=a[0],r=a[1],i=a[2],s=a[3],o=a[4],l=Object(n.useState)(c),d=Object(j.a)(l,2),b=d[0],u=(d[1],Object(n.useState)(o)),h=Object(j.a)(u,2),p=h[0],O=(h[1],Object(n.useState)("")),m=Object(j.a)(O,2),f=m[0],x=m[1],y=Object(n.useState)(""),v=Object(j.a)(y,2),S=v[0],w=v[1],C=Object(n.useState)(""),k=Object(j.a)(C,2),T=k[0],P=k[1],E=Object(n.useState)(!1),D=Object(j.a)(E,2),_=D[0],F=D[1],N=Object(n.useState)("16.66%"),B=Object(j.a)(N,2),M=B[0],I=B[1],A=Object(n.useState)("83.33%"),L=Object(j.a)(A,2),R=L[0],H=L[1],Y=Object(n.useState)("hidden"),q=Object(j.a)(Y,2),V=q[0],J=q[1],W=Object(n.useState)("inherit"),$=Object(j.a)(W,2),Z=$[0],X=$[1],G=function(){F(!_),I("16.66%"===M?"3%":"16.66%"),H("83.33%"===R?"97%":"83.33%"),X("none"===Z?"inherit":"none"),J("hidden"===V?"visible":"hidden")},K=function(e){return-1!==p.map((function(e){return e.filterText})).indexOf(e)};return Object(g.jsxs)(Q,{initialState:{chips:o,members:c},children:[Object(g.jsxs)("div",{className:"col-1-1 mainContent",children:[Object(g.jsxs)("div",{className:"col-2-12",style:{width:M,overflowY:"scroll",maxHeight:"780px",padding:"10px"},children:[Object(g.jsxs)("div",{style:Object.assign({},{display:Z}),children:[Object(g.jsxs)("div",{className:"sidebarHeader",children:[Object(g.jsx)("div",{style:Object.assign({},{float:"left",padding:5,width:"50%",textAlign:"left"}),children:"Filters"}),Object(g.jsx)("div",{style:Object.assign({},{float:"right",padding:5,width:"50%",textAlign:"right"}),children:Object(g.jsx)(Xe,{onClick:G,alt:"left"})})]}),Object(g.jsx)(z.a,{}),Object(g.jsxs)("div",{children:[Object(g.jsx)(Fe,{handleSearch:function(e){x(e)},searchText:f,searchBy:"Country"}),Object(g.jsx)(ze,{filterFacets:r,members:b,filterBy:"country",searchText:f,isIchecked:K})]}),Object(g.jsx)(z.a,{}),Object(g.jsxs)("div",{children:[Object(g.jsx)(Fe,{handleSearch:function(e){w(e)},searchText:S,searchBy:"Currency"}),Object(g.jsx)(ze,{filterFacets:i,members:b,filterBy:"currency",searchText:S,isIchecked:K})]}),Object(g.jsx)(z.a,{}),Object(g.jsxs)("div",{children:[Object(g.jsx)(Fe,{handleSearch:function(e){P(e)},searchText:T,searchBy:"Membership Type"}),Object(g.jsx)(ze,{filterFacets:s,members:b,filterBy:"membership_type",searchText:T,isIchecked:K})]})]}),Object(g.jsxs)("div",{style:Object.assign({},{visibility:V}),children:[Object(g.jsx)("h3",{}),Object(g.jsx)(at,{style:Object.assign({},{float:"right"}),onClick:G,alt:"right"})]})]}),Object(g.jsxs)("div",{className:"col-10-12",style:{width:R,marginLeft:"3%",position:"relative"},children:[Object(g.jsx)(Ae,{members:b}),Object(g.jsx)(De,{})]})]}),Object(g.jsx)(ee,{countriesReference:r,currenciesReference:i,membershipTypesReference:s})]})},it=(a(1949),function(e){var t=Object(n.useState)(!1),a=Object(j.a)(t,2);a[0],a[1];return Object(n.useEffect)((function(){var e=document.URL;e=e.substr(e.lastIndexOf("/"))}),[]),Object(g.jsxs)("div",{className:"topnav",children:[Object(g.jsx)(o.b,{to:"/dashboard",children:"Home"}),Object(g.jsx)(o.b,{to:"/dashboard/stocks",children:"Stock Symbol Tracker"}),Object(g.jsx)(o.b,{to:"/dashboard/filter_table",children:"List Page"}),Object(g.jsx)(o.b,{to:"/dashboard/expand_table",children:"Expandable Table"})]})}),st=(a(1951),Object(s.a)((function(e){return{root:{margin:0,position:"absolute",top:"50%","-ms-transform":"translateY(-50%)",transform:"translateY(-50%)",width:"100%",display:"flex",justifyContent:"center","& > *":{height:e.spacing(30)}}}})));var ot=function(){var e=st();return Object(g.jsx)("div",{className:"App",children:Object(g.jsxs)(o.a,{children:[Object(g.jsx)(l.a,{exact:!0,path:"/dashboard",render:function(){return Object(g.jsxs)(c.a.Fragment,{children:[Object(g.jsx)(it,{}),Object(g.jsxs)("div",{className:e.root,children:[Object(g.jsx)("div",{className:"paper",children:Object(g.jsx)(d.a,{elevation:0,children:Object(g.jsx)(o.b,{to:"/dashboard/stocks",children:"Stock Tracker"})})}),Object(g.jsx)("div",{className:"paper",children:Object(g.jsx)(d.a,{children:Object(g.jsx)(o.b,{to:"/dashboard/expand_table",children:"Expandable Table"})})}),Object(g.jsx)("div",{className:"paper",children:Object(g.jsx)(d.a,{elevation:3,children:Object(g.jsx)(o.b,{to:"/dashboard/filter_table",children:"List Page"})})})]})]})}}),Object(g.jsx)(l.a,{path:"/dashboard/stocks",render:function(){return Object(g.jsxs)(c.a.Fragment,{children:[Object(g.jsx)(it,{}),Object(g.jsx)("hr",{}),Object(g.jsx)(A,{})]})}}),Object(g.jsx)(l.a,{path:"/dashboard/expand_table",render:function(){return Object(g.jsxs)(c.a.Fragment,{children:[Object(g.jsx)(it,{}),Object(g.jsx)("hr",{}),Object(g.jsx)(V,{})]})}}),Object(g.jsx)(l.a,{path:"/dashboard/filter_table",render:function(){return Object(g.jsxs)(c.a.Fragment,{children:[Object(g.jsx)(it,{}),Object(g.jsx)("hr",{}),Object(g.jsx)(rt,{})]})}})]})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(ot,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},280:function(e,t,a){},340:function(e,t,a){},365:function(e,t,a){},671:function(e,t,a){}},[[1952,1,2]]]);
//# sourceMappingURL=main.7e5d537e.chunk.js.map