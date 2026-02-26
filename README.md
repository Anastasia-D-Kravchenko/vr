## ## Project Overview

This project is a functional VR game where players use Oculus/Meta Touch controllers to shoot projectiles at entities that dynamically follow the player's position.

## ## Core VR Techniques Applied

### ### 1. Movement and Navigation

* **Snap Turning**: Implemented using thumbstick horizontal ($x$) axis detection to rotate the player rig.
* **Smooth Locomotion**: Forward and backward movement is handled by translating the player's position based on the vertical ($y$) axis of the thumbstick.

### ### 2. Targeting and Interaction

* **Raycasting**: Controllers use a `raycaster` component to identify objects with the `.target` class.
* **Gaze Interaction**: A fallback gaze-based system allows interaction using the camera's center-point for non-VR or PC users.
* **Haptic Feedback**: High-intensity vibration pulses are sent to the controllers upon firing or collision to provide physical confirmation.

### ### 3. Physics and Game Logic

* **Dynamic Bodies**: Projectiles are spawned as `dynamic-body` entities with velocity applied based on the controller's orientation.
* **Collision Detection**: The scene listens for `collide` events between projectiles and targets to trigger object removal and score updates.
* **Follower AI**: Entities use a `tick` function to calculate the vector between themselves and the camera, moving toward the player every frame.

### ### 4. Asset Management

* **GLB/GLTF Loading**: External 3D models are preloaded using the Asset Management System to prevent frame drops during gameplay.
* **Spatial Audio**: Sound effects like "thunk.wav" are attached to entities to provide 3D positional audio cues.

---

## ## Installation and Setup

### ### Local Development

1. **Server Requirement**: This project must be served via `http://` or `https://`. Opening the `index.html` via `file://` will cause CORS errors for 3D models and sounds.
2. **XAMPP**: Place the project files in the `htdocs` folder and access via `http://localhost/`.
3. **WebStorm**: Use the built-in "Open in Browser" feature to automatically host a local server.

### ### Cloud Hosting

* **Glitch**: You can "remix" an A-Frame template on [Glitch.com](https://glitch.com/) and upload your assets to bypass local server configurations.

## ## Dependencies

* **A-Frame 1.3.0**: Core VR framework.
* 
**Environment Component**: For rapid scene generation (e.g., "yavapai" preset).


* **Physics System**: Used for collision and projectile movement.
