(function(w, d) {

	// STATE
	let ctx;
	let score = 0;
	const GameState = {
		Playing: 0,
		GameOver: 1
	}
	let gameState = GameState.Playing;
	let highScore = 0;
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
	const gates = [];
	const gateRadius = 80;
	const ticksBetweenGates = 105;
	let ticksSinceLastGate = 0;


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
		addGate();
		main();
	}

	function main() {
		update();

		render();

		requestAnimationFrame(main);
	}

	function update() {
		if (gameState === GameState.Playing) {
			cow.pos.y += cow.v.y;
			cow.pos.y = Math.min(cow.pos.y, ctx.canvas.height);
			cow.v.y += gravity;

			gates.forEach(gate => {
				gate.x -= 5;
				if ((gate.x < cow.pos.x + 25 + 30 && gate.x > cow.pos.x - 25 - 30)
				&& (cow.pos.y > gate.y + gateRadius - 20 || cow.pos.y < gate.y - gateRadius + 20)) {
					endGame();
				}
			});

			for (let i = gates.length-1; i >= 0; i--) {
				if (gates[i].x < 0) {
					gates.splice(i, 1);
					score++;
				}
			}

			ticksSinceLastGate++;

			if (ticksSinceLastGate >= ticksBetweenGates) {
				addGate();
				ticksSinceLastGate = 0;
			}
		}
	}

	function endGame() {
		gameState = GameState.GameOver;
	}

	function addGate() {
		gates.push({
			x: ctx.canvas.width,
			y: 0 | Math.random() * ctx.canvas.height
		});
	}

	function render() {
		const { width, height } = ctx.canvas;
		ctx.save();
		ctx.fillStyle = 'lightblue';
		ctx.fillRect(0, 0, width, height);
		if (gameState === GameState.Playing) {
			renderCow({
				x: cow.pos.x,
				y: cow.pos.y
			});
			gates.forEach(gate => {
				ctx.fillStyle = 'green';
				ctx.fillRect(gate.x - 30, 0, 60, gate.y - gateRadius);
				ctx.fillRect(gate.x - 30, gate.y + gateRadius, 60, height - (gate.y + gateRadius));
			});
			ctx.fillStyle = 'red';
			ctx.translate(width >> 1, 20);
			ctx.scale(3, 3);
			ctx.fillText('Score: ' + score, 0, 0);
		}
		if (gameState === GameState.GameOver) {
			ctx.translate(width >> 1, height >> 1);
			ctx.fillStyle = 'red';
			ctx.scale(3, 3);
			ctx.fillText('Game Over! Score: ' + score, 0, 0);
		}
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