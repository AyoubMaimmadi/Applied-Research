use futures::{stream::FuturesUnordered, StreamExt};
use react_vs_wasm_yew::app::{React, AppProps};


async fn render(size: usize, depth: usize, index_file: &str) -> String {
    let renderer = yew::ServerRenderer::<React>::with_props(AppProps {
        size,
        depth,
        interval: 3
    });

    let rendered = renderer.render().await;
    return index_file.replace("/render/{depth}/{girth}", &rendered);
}
async fn render_loop(count: usize, size: usize, depth: usize, index_file: &str) -> u128 {
    let now = std::time::Instant::now();
    if true {
        let futures: FuturesUnordered<_> = (0..count)
            .map(|_| render(size, depth, index_file.clone()))
            .collect();

        let _: Vec<_> = futures.collect().await;
    } else {
        for _ in 0..count {
            render(size, depth, index_file).await;
        }
    }
    return now.elapsed().as_millis()
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    let depth: usize = str::parse(&std::env::args().nth(1).expect("must")).expect("must");
    let index_file = std::fs::read_to_string("./dist/index.html").expect("to work");

    let _100 = render_loop(100, 20, depth, &index_file).await;
    println!("{}", _100);
    let _1000 = render_loop(1000, 20, depth, &index_file).await;
    println!("{}", _1000);
    let _10000 = render_loop(10000, 20, depth, &index_file).await;
    println!("{}", _10000);
    let _100000 = render_loop(100000, 20, depth, &index_file).await;
    println!("{}", _100000);
    let _1000000 = render_loop(1_000_000, 20, depth, &index_file).await;
    println!("{}", _1000000);
}

