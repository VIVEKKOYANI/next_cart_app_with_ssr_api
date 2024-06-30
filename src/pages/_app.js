import { wrapper } from "@/redux/store.js";
import "@/styles/globals.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);