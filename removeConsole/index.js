module.exports=function(context){
 let exp = /console\.log\(.+?\)/g;
 return context.replace(exp,"");
}