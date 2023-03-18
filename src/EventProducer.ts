// ez kell hogy .call létezzen
type CallbackFunction = (...args: any[]) => void;

// itt jól jönne egy osztály szintű generic, amit nem kell a
// hívónak megadnia, mivel az származtatható a megadott genericekből
export class EventProducer<M> {
	// kell a generic típus, hiszen minden más is típusos, de fieldhez nem lehet kiírni
	// nem a legszebb, de mivel K-t nem adjuk vissza így nincs gond
	private listeners: { type: keyof M; listener: M[keyof M] & CallbackFunction; obj?: Object }[] = [];

	// keyof M: unió típus a keyekből
	addEventListener<K extends keyof M, V extends M[K] & CallbackFunction>(type: K, listener: V, obj?: Object) {
		this.listeners.push({ type, listener, obj });
	}
	removeEventListener<K extends keyof M, V extends M[K] & CallbackFunction>(type: K, listener: V) {
		this.listeners.splice(
			this.listeners.findIndex(
				(x) => x.type === type && x.listener === listener
			),
			1
		);
	}
	protected dispatch<K extends keyof M>(type: K, ...args: any[]) {
		for (let listener of this.listeners.filter((x) => x.type === type))
			listener.listener.call(listener.obj, ...args);
	}
	removeAllEventListener(obj: Object) {
		if (!obj) throw new Error("Must specify object");
		this.listeners = this.listeners.filter((x) => x.obj !== obj);
	}
}
