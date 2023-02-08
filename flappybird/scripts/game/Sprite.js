export function drawRotate(ctx, img, position, width, height, offsetX, offsetY, offsetWidth, offsetHeight, angle) {
    ctx.save();
    ctx.translate(position.getX(), position.getY());
    ctx.rotate(angle * Math.PI / 180);

    ctx.drawImage(img, offsetX, offsetY, offsetWidth, offsetHeight, -width / 2, -height / 2, width, height);

    ctx.rotate(-(angle * Math.PI / 180));
    ctx.translate(position.getX(), position.getY());
    ctx.restore();
}