AFRAME.registerComponent('follower', {
    schema: { speed: { type: 'number', default: 0.02 } },
    tick: function () {
        const playerEl = document.querySelector('[camera]');
        if (!playerEl) return;

        const playerPos = playerEl.object3D.position;
        const currentPos = this.el.object3D.position;

        let direction = new THREE.Vector3().subVectors(playerPos, currentPos);
        direction.y = 0;

        if (direction.length() > 1.5) {
            direction.normalize();
            direction.multiplyScalar(this.data.speed);
            this.el.object3D.position.add(direction);
            this.el.object3D.lookAt(playerPos.x, currentPos.y, playerPos.z);
        }
    }
});

AFRAME.registerComponent('shooter', {
    init: function () {
        const el = this.el;
        const hud = document.querySelector('#hud');
        let targetCount = 0;

        // Spawning Logic
        setInterval(() => {
            let rabbit = document.createElement('a-entity'); // Correct declaration
            let angle = Math.random() * Math.PI * 2;
            let startX = Math.cos(angle) * 10;
            let startZ = Math.sin(angle) * 10;

            rabbit.setAttribute('class', 'target');
            rabbit.setAttribute('gltf-model', '#rabbitModel');
            rabbit.setAttribute('scale', '0.01 0.01 0.01');
            rabbit.setAttribute('position', {x: startX, y: 0.2, z: startZ});
            rabbit.setAttribute('static-body', '');
            rabbit.setAttribute('follower', '');

            document.querySelector('#enemy-container').appendChild(rabbit);
        }, 4000);

        // Shooting Logic
        el.addEventListener('triggerdown', (evt) => {
            let projectile = document.createElement('a-sphere');
            projectile.setAttribute('radius', '0.1');
            projectile.setAttribute('color', 'red');
            projectile.setAttribute('dynamic-body', 'shape: sphere; mass: 2');

            let pos = el.getAttribute('position');
            projectile.setAttribute('position', pos);

            let dir = new THREE.Vector3(0, 0, -1);
            dir.applyQuaternion(el.object3D.quaternion);
            dir.multiplyScalar(15);
            projectile.setAttribute('velocity', dir);

            el.sceneEl.appendChild(projectile);

            // Haptics
            if (evt.detail.gamepad && evt.detail.gamepad.hapticActuators) {
                evt.detail.gamepad.hapticActuators[0].pulse(0.5, 100);
            }
        });

        // Collision Detection
        el.sceneEl.addEventListener('collide', (e) => {
            if (e.detail.body.el.classList.contains('target')) {
                let target = e.detail.body.el;
                if (target.parentNode) {
                    target.parentNode.removeChild(target);
                    targetCount++;
                    hud.setAttribute('value', 'Targets Destroyed: ' + targetCount);
                }
            }
        });
    }
});