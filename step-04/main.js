(function(w, d) {

	// STATE
	let ctx;
	let cow = {
		pos: {
			x: 0,
			y: 0
		},
		v: {
			y: 0
		}
	}
	const gravity = 0.3;


	// METHODS
	function init() {
		ctx = d.getElementsByTagName('canvas')[0].getContext('2d');
		ctx.canvas.height = 675;
		ctx.canvas.width = 1200;
		cow.pos.x = ctx.canvas.width >> 2;
		cow.pos.y = ctx.canvas.height >> 1;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		w.addEventListener('keyup', handleInput);
		main();
	}

	function main() {
		update();

		render();

		requestAnimationFrame(main);
	}

	function update() {
		cow.pos.y += cow.v.y;
		cow.pos.y = Math.min(cow.pos.y, ctx.canvas.height);
		cow.v.y += gravity;
	}

	function render() {
		ctx.save();
		ctx.fillStyle = 'lightblue';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		renderCow({
			x: cow.pos.x,
			y: cow.pos.y
		});
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
		if (e.key === ' ') {
			cow.v.y = -5;
		}
	}


	// DOM STATE & INITIALIZATION
	if (d.readyState !== 'loading') {
		return init();
	}

	w.addEventListener('DOMContentLoaded', init);

})(window, document);