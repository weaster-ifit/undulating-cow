(function(w, d) {

	// STATE
	let ctx;


	// METHODS
	function init() {
		ctx = d.getElementsByTagName('canvas')[0].getContext('2d');
		ctx.canvas.height = 675;
		ctx.canvas.width = 1200;
		w.addEventListener('keyup', handleInput);
		main();
	}

	function main() {
		// handleInput();

		// update();

		render();

		requestAnimationFrame(main);
	}

	function render() {

	}

	function handleInput(e) {
		console.log(e.key);
	}


	// DOM STATE & INITIALIZATION
	if (d.readyState !== 'loading') {
		return init();
	}

	w.addEventListener('DOMContentLoaded', init);

})(window, document);