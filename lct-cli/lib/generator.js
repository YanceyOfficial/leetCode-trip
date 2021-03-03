`)}return this}if(this.isSpinning){return this}if(this.hideCursor){cliCursor.hide(this.stream)}if(this.discardStdin&&process.stdin.isTTY){this.isDiscardingStdin=true;stdinDiscarder.start()}this.render();this.id=setInterval(this.render.bind(this),this.interval);return this}stop(){if(!this.isEnabled){return this}clearInterval(this.id);this.id=void 0;this.frameIndex=0;this.clear();if(this.hideCursor){cliCursor.show(this.stream)}if(this.discardStdin&&process.stdin.isTTY&&this.isDiscardingStdin){stdinDiscarder.stop();this.isDiscardingStdin=false}return this}succeed(text){return this.stopAndPersist({symbol:logSymbols.success,text})}fail(text){return this.stopAndPersist({symbol:logSymbols.error,text})}warn(text){return this.stopAndPersist({symbol:logSymbols.warning,text})}info(text){return this.stopAndPersist({symbol:logSymbols.info,text})}stopAndPersist(options={}){if(this.isSilent){return this}const prefixText=options.prefixText||this.prefixText;const text=options.text||this.text;const fullText=typeof text==="string"?" "+text:"";this.stop();this.stream.write(`${this.getFullPrefixText(prefixText," ")}${options.symbol||" "}${fullText}
`);return this}};var oraFactory=function(options){return new Ora(options)};module2.exports=oraFactory;module2.exports.promise=(action,options)=>{if(typeof action.then!=="function"){throw new TypeError("Parameter `action` must be a Promise")}const spinner=new Ora(options);spinner.start();(async()=>{try{await action;spinner.succeed()}catch{spinner.fail()}})();return spinner}});var require_lib2=__commonJS(exports2=>{"use strict";Object.defineProperty(exports2,"__esModule",{value:true});var e=t=>t.reduce((t2,o)=>Array.isArray(o)?t2.concat(e(o)):t2.concat(o),[]);exports2.capitalized=e2=>e2.toLowerCase().replace(/( |^)[a-z]/g,e3=>e3.toUpperCase()),exports2.checkWebp=()=>document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")===0,exports2.deduplicateArray=e2=>[...new Set(e2)],exports2.deduplicateObjectArray=(e2,t)=>{const o={};return e2.reduce((e3,r)=>(!o[r[t]]&&(o[r[t]]=e3.push(r)),e3),[])},exports2.deepFlatten=e,exports2.formatCookie=e2=>{const t={};return e2.split(";").forEach(e3=>t[e3.split("=")[0]]=e3.split("=")[1]),t},exports2.formatJSONDate=e2=>new Date(+new Date(new Date(e2).toJSON())+288e5).toISOString().replace(/T/g," ").replace(/\.[\d]{3}Z/,""),exports2.getFileExtension=e2=>e2.slice(2+(e2.lastIndexOf(".")-1>>>0)),exports2.getRandomInt=(e2,t)=>(e2=Math.ceil(e2),t=Math.floor(t),Math.floor(Math.random()*(t-e2))+e2),exports2.getRandomIntInclusive=(e2,t)=>(e2=Math.ceil(e2),t=Math.floor(t),Math.floor(Math.random()*(t-e2+1))+e2),exports2.getType=e2=>Object.prototype.toString.call(e2).slice(8,-1).toLowerCase(),exports2.isValidIP=e2=>/^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$/.test(e2),exports2.mongoObjectIdToTimestamp=e2=>1e3*parseInt(e2.substring(0,8),16),exports2.randomColor=()=>"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6),exports2.randomSeries=(e2,t=36)=>Math.random().toString(t).slice(2,2+e2),exports2.shuffle=e2=>{let t,o=e2.length;for(;o;)t=Math.floor(Math.random()*o--),[e2[o],e2[t]]=[e2[t],e2[o]];return e2},exports2.simpleToThousands=(e2,t="$")=>t+e2.toLocaleString("en-US"),exports2.sleep=(e2=1e3)=>new Promise(t=>setTimeout(()=>t(),e2)),exports2.sortBy=(e2,t="ascend")=>(o,r)=>o[e2]<r[e2]?t==="ascend"?-1:1:o[e2]>r[e2]?t==="ascend"?1:-1:0,exports2.toThousands=(e2,t="$")=>t+e2.replace(/(\d)(?=(\d{3})+$)/g,"$1,")});var import_chalk=__toModule(require_source());var import_clear=__toModule(require_clear());var import_figlet=__toModule(require_node_figlet());var import_inquirer=__toModule(require_inquirer());var import_process=__toModule(require("process"));var Category;(function(Category2){Category2["Easy"]="Easy";Category2["Medium"]="Medium";Category2["Hard"]="Hard";Category2["Others"]="Others"})(Category||(Category={}));var srcPath=`${import_process.cwd()}/src/LeetCode`;var docPath=`${import_process.cwd()}/leetcode-docs`;var choices=[{name:Category.Easy},{name:Category.Medium},{name:Category.Hard},{name:Category.Others}];var dirSelect=()=>import_inquirer.default.prompt([{type:"list",message:"\u8BF7\u9009\u62E9\u96BE\u5EA6: ",name:"dir",choices}]);var import_fs=__toModule(require("fs"));var getFileList=dirName=>{const path=`${srcPath}/${dirName}`;return import_fs.readdirSync(path).sort((a,b)=>+a.split(".")[0]-+b.split(".")[0])};var import_inquirer2=__toModule(require_inquirer());var import_inquirer_autocomplete_prompt=__toModule(require_inquirer_autocomplete_prompt());var import_fs2=__toModule(require("fs"));var import_param_case=__toModule(require_dist4());var parseFile=content=>{const functionBodyMatcher=content.match(/\/\/ @lc code=start([\s\S]*)?\/\/ @lc code=end/im);if(Array.isArray(functionBodyMatcher)){const functionBody=functionBodyMatcher[1];const functionNameMatcher=functionBody.match(/var([\s\S]*?)=/i);if(Array.isArray(functionNameMatcher)){const functionName=functionNameMatcher[1].trim();return{functionBody,functionName:import_param_case.paramCase(functionName)}}throw new Error("Can not get the function name string.")}else{throw new Error("Can not get the function body string.")}};var getFileMeta=(dirName,fileName,isValidate)=>{const path=`${srcPath}/${dirName}/${fileName}`;const file=import_fs2.readFileSync(path,{encoding:"utf-8"});const[serial,title]=fileName.split(".");const{functionName,functionBody}=parseFile(file);const outPath=`${docPath}/${dirName.toLowerCase()}/${serial}-${functionName}.md`;if(import_fs2.existsSync(outPath)){return false}return isValidate?true:{outPath,meta:{serial,title,functionName,functionBody}}};import_inquirer2.default.registerPrompt("autocomplete",import_inquirer_autocomplete_prompt.default);var fileSelect=(dir,choices2)=>import_inquirer2.default.prompt([{type:"autocomplete",message:"\u8BF7\u9009\u62E9\u6587\u4EF6: ",name:"file",pageSize:20,source:(answersSoFar,input)=>choices2.filter(choice=>choice.includes(input||"")),validate:input=>getFileMeta(dir,input.name||"",true)}]);var import_ora=__toModule(require_ora());var import_fs3=__toModule(require("fs"));var import_yancey_js_util=__toModule(require_lib2());var generateTemplate=(serial,title,functionName,functionBody)=>`---
id: ${serial}-${functionName}
title: ${title}
sidebar_label: ${serial}. ${title}
---

## \u9898\u76EE

\u8FD9\u91CC\u662F\u9898\u76EE\u8FD9\u91CC\u662F\u9898\u76EE\u8FD9\u91CC\u662F\u9898\u76EE\u8FD9\u91CC\u662F\u9898\u76EE\u8FD9\u91CC\u662F\u9898\u76EE

:::info \u793A\u4F8B

\u8F93\u5165:

\u8F93\u51FA:
:::

## \u9898\u89E3

\u8FD9\u91CC\u662F\u9898\u89E3\u8FD9\u91CC\u662F\u9898\u89E3\u8FD9\u91CC\u662F\u9898\u89E3\u8FD9\u91CC\u662F\u9898\u89E3\u8FD9\u91CC\u662F\u9898\u89E3

\`\`\`ts
${functionBody}
\`\`\`
`;var generateMarkdownFile=async(dirName,fileName)=>{const fileMeta=getFileMeta(dirName,fileName);if(typeof fileMeta==="boolean")return;const{outPath,meta:{serial,title,functionBody,functionName}}=fileMeta;const spinner=import_ora.default("\u6B63\u5728\u521B\u5EFA\u4E2D...").start();await import_yancey_js_util.sleep();await import_fs3.promises.writeFile(outPath,generateTemplate(serial,title,functionName,functionBody));spinner.stop();import_ora.default().succeed("\u6A21\u7248\u521B\u5EFA\u6210\u529F!")};var bootstrap=async()=>{import_clear.default();console.log(import_chalk.default.blue(import_figlet.default.textSync("LEETCODE TRIP",{horizontalLayout:"default",verticalLayout:"default"})));const{dir}=await dirSelect();const files=getFileList(dir);const{file}=await fileSelect(dir,files);await generateMarkdownFile(dir,file)};bootstrap();
/*!
 * Tmp
 *
 * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
 *
 * MIT Licensed
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */