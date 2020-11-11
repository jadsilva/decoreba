
window.addEventListener("load", function() {
	// Returns a random integer between min (included) and max (included)
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	Array.prototype.shuffle = function() {
		for (var i = this.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
		return this;
	}

	const select = document.getElementById('multiplier');
	const questionH2 = document.getElementById('question');
	questionH2.hidden = true;
	const anwsersDiv = document.getElementById('anwsers');
	const anwsersTable = document.createElement('table');
	const multiplicands = [1,2,3,4,5,6,7,8,9];
	var scoreIn = 0;
	var scoreOut = 0;
	multiplicands.forEach(n => {
		const opt = document.createElement("option");
		opt.value = n;
		opt.text = n;
		select.add(opt, null)
	});
	select.addEventListener('change', function (selectEvent) {
		if (select[0].value === '')
			select.remove(0); // remove a primeira opção vazia
		for (let i=0;i<anwsersTable.rows.length;++i)
			anwsersTable.deleteRow(anwsersTable.rows[i]);
		const multiplier = selectEvent.target.value;
		const anwsers = multiplicands.map(n => n * multiplier).shuffle();
		const themultiplicand = randomInt(multiplicands[0], multiplicands[multiplicands.length - 1]);
		questionH2.innerHTML = multiplier + ' x ' + themultiplicand;
		questionH2.hidden = false;
		const anwsRow = anwsersTable.insertRow(0);
		for (let i=0;i<anwsers.length;++i) {
			const text = document.createTextNode(anwsers[i]);
			const button = document.createElement('button');
			button.addEventListener('click', function (event) {
				if (anwsers[i] == (themultiplicand * multiplier)) {
					++scoreIn;
					select.dispatchEvent(selectEvent);
				} else {
					anwsRow.setAttribute('style', 'background-color:red');
					console.log('ERRO: ' + anwsers[i] + '!=' + themultiplicand * multiplier);
					++scoreOut;
				}
				const scoreSpan = document.getElementById('score');
				scoreSpan.innerHTML = scoreIn + '/' + (scoreIn + scoreOut);
			});
			button.appendChild(text);
			const cell = anwsRow.insertCell(i);
			cell.appendChild(button);
		}
		anwsersDiv.appendChild(anwsersTable);
	});
});
