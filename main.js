var cb = document.createElement('input');
cb.type = 'checkbox';
cb.id = 'chat-img-block';
cb.name = 'chat-img-block';

var label = document.createElement('label');
label.for = 'chat-img-block';


label.textContent = 'Block Images'
label.prepend(cb);
label.style = "float: left; padding: 24px 10px;"

document.querySelector('.logo-rr.logo-community').insertAdjacentElement('afterend', label)

var cb = document.createElement('input');
cb.type = 'checkbox';
cb.id = 'chat-mv-img-block';
cb.name = 'chat-mv-img-block';

var label = document.createElement('label');
label.for = 'chat-mv-img-block';


label.textContent = 'Block Moving Images'
label.prepend(cb);
label.style = "float: left; padding: 24px 5px;"

document.querySelector('.logo-rr.logo-community').insertAdjacentElement('afterend', label)

var observer = new MutationObserver(callback)

function callback(mutationList, observer) {
    if (document.getElementById('chat-img-block').checked || document.getElementById('chat-mv-img-block').checked) {
        for (mut of mutationList) {
            if (mut.type == 'childList') {
                Array.from(mut.addedNodes).forEach(node => {
                    if (node.nodeName != '#text') {
                        if(node.querySelector('.message-photo')) {
                            Array.from(node.querySelectorAll('.message-photo')).forEach(node => {
                                if (document.getElementById('chat-mv-img-block').checked && node.querySelector('a').href?.endsWith('gif')) {
                                    node.outerHTML = '[img removed]'
                                    console.log(`Removed photo ${node.querySelector('a').href}`)
                                    return
                                }
                                if (document.getElementById('chat-img-block').checked) {
                                    node.outerHTML = '[img removed]';
                                    console.log(`Removed photo`);
                                }
                                
                                
                            })
                        }
                    }
                })
            }
            
        }
    }
}

if (document.getElementById('chat-history')) {
    observer.observe(
        document.getElementById('chat-history'),
        {
            subtree: true,
            childList: true
        }
    )
}
