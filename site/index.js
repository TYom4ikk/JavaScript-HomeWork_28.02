const messageForm = document.querySelector('#add-message');
const emptyChatMessage = document.querySelector('#empty-chat');
const messagesContainer = document.querySelector('#messages-container');

let messagesArray = new Array;

let notEmpty = false;

messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const { username, usermessage } = getFormObject(messageForm);
	addMessage(username, usermessage, new Date());
	messageForm.reset();
});

function addMessage(name, message, date) {
	setMessageSpaceStatus();

	const newMessage = generateElement('div', 'message');
	const currentMonth = (date.getMonth() + 1 < 10 ? '0' : '') +
		(date.getMonth() + 1);

	const messageHeader = generateElement('div', 'message-header');	
	newMessage.appendChild(messageHeader);
	messageHeader.appendChild(generateElement(
		'h4',
		'message-title',
		'',
		name
	));
	messageHeader.appendChild(generateElement(
		'p',
		'message-date',
		'',
		`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${currentMonth}.${date.getFullYear()}`
	));

	newMessage.appendChild(generateElement(
		'p',
		'message-text',
		'',
		message
	));

	//=====REMOVE BUTTON=====

	const removeBtn = generateElement(
		'button',
		'btn-remove',
		'remove',
		'Удалить'
	);
	removeBtn.addEventListener('click',()=>{
		removeMessage(newMessage);
	});
	newMessage.appendChild(removeBtn);

	messagesContainer.appendChild(newMessage);
	messagesArray.push(newMessage);
}

function getFormObject(form) {
	return Array.from(form.elements)
		.filter(element => {
			return element.type != 'submit';
		}).reduce((result, element) => {
			const { name, type } = element;
			const value = type == 'checkbox' ? element.checked : element.value;
			result[name] = value;
			return result;
		}, {});
}

function generateElement(tagName, tagClass = '', tagId = '', tagValue = '') {
	const newElement = document.createElement(tagName);
	newElement.className = tagClass;
	newElement.id = tagId;
	newElement.innerText = tagValue;
	return newElement;
}

function removeMessage(message){
	let index = messagesArray.indexOf(message);
	messagesArray.splice(index, 1);
	message.style.display = 'none';
	setMessageSpaceStatus();
}

function setMessageSpaceStatus(){
	if (!notEmpty) {
		notEmpty = true;
		emptyChatMessage.style.display = 'none';
	}
	else if(messagesArray.length == 0){
		notEmpty = false;
		emptyChatMessage.style.display = 'block';
	}
}