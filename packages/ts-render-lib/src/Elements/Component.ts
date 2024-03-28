import { BaseContainerElementRenderer } from "@/GenericElements/BaseContainerElementRenderer";

export class Component<T> extends BaseContainerElementRenderer {
	props?: T;

	constructor(props?: T) {
		super();
		this.props = props;
	}

	onMounted(callback: () => void) {
		this.onMountedCallback = callback;
	}

	onDestroyed(callback: () => void) {
		this.onDestroyedCallback = callback;
	}
}
