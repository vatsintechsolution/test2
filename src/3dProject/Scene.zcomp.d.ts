import { ZComponent, ContextManager, Observable, Animation, Layer, LayerClip, Event } from "@zcomponent/core";

import { CameraEnvironmentMap as CameraEnvironmentMap_0 } from "@zcomponent/zappar-three/lib/components/environments/CameraEnvironmentMap";
import { DefaultCookieConsent as DefaultCookieConsent_1 } from "@zcomponent/core/lib/components/DefaultCookieConsent";
import { DefaultLoader as DefaultLoader_2 } from "@zcomponent/core/lib/components/DefaultLoader";
import { Group as Group_3 } from "@zcomponent/three/lib/components/Group";
import { DirectionalLight as DirectionalLight_4 } from "@zcomponent/three/lib/components/lights/DirectionalLight";
import { GLTF as GLTF_5 } from "@zcomponent/three/lib/components/models/GLTF";
import { ShadowPlane as ShadowPlane_6 } from "@zcomponent/three/lib/components/meshes/ShadowPlane";
import { UserPlacementAnchorGroup as UserPlacementAnchorGroup_7 } from "@zcomponent/zappar-three/lib/components/anchorgroups/UserPlacementAnchorGroup";
import { WorldTracker as WorldTracker_8 } from "@zcomponent/zappar-three/lib/components/trackers/WorldTracker";
import { WorldTrackingUI as WorldTrackingUI_9 } from "@zcomponent/zappar-three/lib/components/WorldTrackingUI";
import { ZapparCamera as ZapparCamera_10 } from "@zcomponent/zappar-three/lib/components/cameras/Camera";

interface ConstructorProps {

}

/**
* @zcomponent
* @zicon zcomponent
*/
declare class Comp extends ZComponent {

	constructor(contextManager: ContextManager, constructorProps: ConstructorProps);

	nodes: {
		CameraEnvironmentMap: CameraEnvironmentMap_0 & {
			behaviors: {

			}
		},
		DefaultCookieConsent: DefaultCookieConsent_1 & {
			behaviors: {

			}
		},
		DefaultLoader: DefaultLoader_2 & {
			behaviors: {

			}
		},
		Defaults: Group_3 & {
			behaviors: {

			}
		},
		DirectionalLight: DirectionalLight_4 & {
			behaviors: {

			}
		},
		Modern_ArmChair01_glb: GLTF_5 & {
			behaviors: {

			}
		},
		ShadowPlane: ShadowPlane_6 & {
			behaviors: {

			}
		},
		UserPlacementAnchorGroup: UserPlacementAnchorGroup_7 & {
			behaviors: {

			}
		},
		WorldTracker: WorldTracker_8 & {
			behaviors: {

			}
		},
		WorldTrackingUI: WorldTrackingUI_9 & {
			behaviors: {

			}
		},
		ZapparCamera: ZapparCamera_10 & {
			behaviors: {

			}
		},
	};

	animation: Animation & { layers: {

	}};

	/**
	 * The position, in 3D space, of this node relative to its parent. The three elements of the array correspond to the `x`, `y`, and `z` components of position.
	 * 
	 * @zprop
	 * @zdefault [0,0,0]
	 * @zgroup Transform
	 * @zgrouppriority 10
	 */
	public position: Observable<[x: number, y: number, z: number]>;

	/**
	 * The rotation, in three dimensions, of this node relative to its parent. The three elements of the array correspond to Euler angles - yaw, pitch and roll.
	 * 
	 * @zprop
	 * @zdefault [0,0,0]
	 * @zgroup Transform
	 * @zgrouppriority 10
	 */
	public rotation: Observable<[x: number, y: number, z: number]>;

	/**
	 * The scale, in three dimensions, of this node relative to its parent. The three elements of the array correspond to scales in the the `x`, `y`, and `z` axis.
	 * 
	 * @zprop
	 * @zdefault [1,1,1]
	 * @zgroup Transform
	 * @zgrouppriority 10
	 */
	public scale: Observable<[x: number, y: number, z: number]>;

	/**
	 * Determines if this object and its children are rendered to the screen.
	 * 
	 * @zprop
	 * @zdefault true
	 * @zgroup Appearance
	 * @zgrouppriority 11
	 */
	public visible: Observable<boolean>;
}

export default Comp;
