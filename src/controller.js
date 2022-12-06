export function cardRotate(event, target) {
    event.preventDefault();

    var angleRotate = Math.PI / 12;
    if (target) target.rotateY(angleRotate * Math.sign(event.deltaY));

    var rotCardAngle = Math.round(MathUtils.radToDeg(target.rotation.y));
    console.log(rotCardAngle);
}


export function cardTranslate(event, target) {
    event.preventDefault();

    var mouse = new Vector2();
    const centerScreen = new Vector2(window.innerWidth / 2, window.innerHeight / 2 );
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (target) target.rotateY(mouse.y * 0.01);

}
