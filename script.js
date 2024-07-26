const DIV_QUANTITY = 100;

function createDivElement(position) {
	const div = document.createElement('div');

	div.setAttribute('data-default_position', position);
	div.classList.add('page_divElement');

	div.textContent = `Div #${position}`;

	return div;
}

function handleDivMovmentAtTop(divElement) {
	divElement.setAttribute('data-isMoved', true);
	document.body.prepend(divElement);
}

function handleDivMovmentAtDefaultPos(divElement) {
	const divDefaultPosition = divElement.dataset.default_position;
	const adjacenteePosition = divDefaultPosition > 1 && divDefaultPosition - 1;

	let movedDivAdjacentee;

	if (adjacenteePosition) {
		movedDivAdjacentee = document.querySelector(`[data-default_position="${adjacenteePosition}"]`);
	} else {
		//if user's click was at the first div
		divElement.setAttribute('data-isMoved', false);
		document.body.prepend(divElement);
		return;
	}

	if (!movedDivAdjacentee) throw new Error('Check the searching selector at 23th line of the codebase!');

	movedDivAdjacentee.after(divElement);
	divElement.setAttribute('data-isMoved', false);
}

function handleDivMovment(e) {
	e.stopPropagation();
	const clickedDiv = e.target;

	const wasDivMovedBefore = Boolean(clickedDiv.dataset['ismoved'] === 'true');

	if (wasDivMovedBefore) {
		handleDivMovmentAtDefaultPos(clickedDiv);
	} else {
		handleDivMovmentAtTop(clickedDiv);
	}
}

function attachEventListenerToElement(element) {
	if (!element) throw new Error('An element was not mounted to DOM. Refresh you page!');

	element.addEventListener('click', handleDivMovment);
}

function mountDivElementsIntoDOM() {
	const body = document.body;

	for (let i = 1; i <= DIV_QUANTITY; i++) {
		const div = createDivElement(i);
		attachEventListenerToElement(div);
		body.appendChild(div);
	}
}

const handleDOMLoading = () => {
	document.addEventListener('DOMContentLoaded', mountDivElementsIntoDOM);
};

handleDOMLoading();
