'atomic component';

import { vec3 } from 'gl-matrix';
const { input } = Atomic;

const BRAKE_FORCE = 0.2;
const MOVE_FORCE = 1.8;
const YAW_SENSITIVITY = 0.1;

/**
 * Component that will rotate a node at a configurable speed.
 */
export default class Controller extends Atomic.JSComponent {
	moveForward = false;
	moveBackwards = false;
	moveLeft = false;
	moveRight = false;
	speed = 1.0;
	mouseMoveX = 0.0;
	mouseMoveY = 0.0;

	start() {
	}

	fixedUpdate(dt: number) {
		const body = <Atomic.RigidBody>this.node.getComponent('RigidBody');

		let moveDir = [ 0, 0, 0 ];
		const rot = this.node.getRotation();

		if (this.moveForward) vec3.add(moveDir, moveDir, [ 0, 0, 1 ]);
		if (this.moveBackwards) vec3.add(moveDir, moveDir, [ 0, 0, -1 ]);
		if (this.moveLeft) vec3.add(moveDir, moveDir, [ -1, 0, 0 ]);
		if (this.moveRight) vec3.add(moveDir, moveDir, [ 1, 0, 0 ]);

		vec3.normalize(moveDir, moveDir);
		vec3.transformQuat(moveDir, moveDir, [ rot[1], rot[2], rot[3], rot[0] ]);
		vec3.scale(moveDir, moveDir, this.speed * MOVE_FORCE);

		let velocity = body.getLinearVelocity();
		vec3.negate(velocity, velocity);
		vec3.scale(velocity, velocity, BRAKE_FORCE);

		body.applyImpulse(moveDir);
		body.applyImpulse(velocity);
	}

	update(dt: number) {
		this.updateControls();
	}

	updateControls() {
		this.moveForward = false;
		this.moveBackwards = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.mouseMoveX = 0.0;
		this.mouseMoveY = 0.0;

		if (input.getKeyDown(Atomic.KEY_PERIOD) || input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP)) this.moveForward = true;
		if (input.getKeyDown(Atomic.KEY_E) || input.getKeyDown(Atomic.KEY_S) || input.getKeyDown(Atomic.KEY_DOWN)) this.moveBackwards = true;
		if (input.getKeyDown(Atomic.KEY_O) || input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT)) this.moveLeft = true;
		if (input.getKeyDown(Atomic.KEY_U) || input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT)) this.moveRight = true;
	}
}
