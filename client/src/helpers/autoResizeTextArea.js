//Resize textarea
export default function handleAutoResize(ev) {
    if (ev.target.scrollHeight > ev.target.clientHeight) {
        ev.target.rows += 1;
    }
}
