function customRender(reactElement, container) {
    /*
    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    domElement.setAttribute('href', reactElement.props.href);
    domElement.setAttribute('target', reactElement.props.target);

    container.appendChild(domElement);
    */

    const domElement = document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for (const prop in reacElement.props) {
        if(prop === 'children') continue;
        domElement.setAttribute(prop, reacElement.props[prop]);
    }
    container.appendChild(domElement);
}

const reacElement = {
    type : 'a',
    props : {
        href : 'https://www.google.com',
        target : '_blank',

    },
    children : 'Click me'
}

const mainContainer = document.querySelector("#root")


customRender(reacElement, mainContainer)


