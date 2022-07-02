use react_vs_wasm_yew::app::React;
use yew::Renderer;

fn main() {
    let renderer = Renderer::<React>::new();
    renderer.hydrate();
}

