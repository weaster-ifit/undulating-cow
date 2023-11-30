(function(w, d) {

	// STATE
	let ctx;


	// METHODS
	function init() {
		ctx = d.getElementsByTagName('canvas')[0].getContext('2d');
		ctx.canvas.height = 675;
		ctx.canvas.width = 1200;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
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
		ctx.save();
		ctx.fillStyle = 'lightblue';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		renderCow({ x: 50, y: 50 });

		ctx.restore();
	}

	function renderCow({ x, y }) {
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(-5, 5);
		ctx.fillText('🐄', 0, 0);
		ctx.restore();
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