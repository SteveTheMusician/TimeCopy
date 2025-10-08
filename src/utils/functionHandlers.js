
export function eventListenerHandler(elements,type,func,funcprop) {
  if (elements instanceof NodeList) {
    // remove deletion listeners fist
    for (let i = 0, iLen = elements.length; i < iLen; i++) {
      elements[i].removeEventListener(type,func)
    }
    // create new listener for multiple elements
    for (let i = 0, iLen = elements.length; i < iLen; i++) {
        
        const functionHandler = (e) => func(e,funcprop)
        elements[i].addEventListener(type, functionHandler)
    }
  }else {
    // remove eventlistener first to make shure n
    elements.removeEventListener(type,func)
    // create listener for single element
    const functionHandler = () => func(funcprop)
    elements.addEventListener(type, functionHandler)
  }
}

export function reloadAppAfterChangeHandler(){
  if (window.configUserChanges === true) {
      window.location.reload()
  }
}