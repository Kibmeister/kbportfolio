import { Cursors } from './../cursors';
import { isTouchDevices, isSafari } from './../utils';

export class Cursor4 extends Cursors {
  constructor(index) {
    super(index);
    this.speed = !isTouchDevices ? (!isSafari ? 0.4 : 0.9) : 1;
    this.delta = !isTouchDevices ? (!isSafari ? 0.15 : 0.05) : 0.2;
    this.posterVideo = new URL(
      '../../images/cover.jpg?as=webp&width=1920',
      import.meta.url
    );
    this.init();
    this.loop();
  }

  removeCursor() {
    this.container.innerHTML = '';
  }

  setParamsCursor() {
    this.radiusCursorBack = 40; // Increase this value to make the cursor wider
    this.radiusCursor = 60; // Increase this value to make the cursor wider
    this.strokeColorCursorBack = 'yellow'; // Change the color of the cursor's stroke
    this.fillCursor = 'yellow'; // Change the color of the cursor's fill
    this.maxSqueeze = 0.1;
    this.accelerator = 1000;
  }

  setParamsParticles() {
    this.nbrParticles = !isTouchDevices ? (!isSafari ? 120 : 15) : 40;
    this.radiusStart = this.diagonalWindow() / 9;
    this.radiusDiff = 0.2;
    this.directionRadius = '>';
    this.filterBackId = 'filter-image-back';
    this.filterCursorId = 'filter-image-cursor';
    this.particlesMaskId = 'mask-particles';
    this.idMask = 'maskGradient';
    this.fillParticles = `url('#${this.idMask}')`;
    this.idCursorFilter = 'filter-cursor';
    this.filterParticles = `url('#${this.idCursorFilter}')`;
    this.opacityGrayScale = 0.075;
  }

  drawMaskCursor() {
    return `
  <defs>
    <radialGradient id="${this.idMask}">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/> <!-- Increase opacity here -->
      <stop offset="100%" stop-color="#fff" stop-opacity="0.5"/> <!-- Increase opacity here -->
    </radialGradient>
    <mask id=${this.particlesMaskId}>${this.drawParticles()}</mask>
    <mask id="cursorParticlesMask">${this.drawParticles()}</mask>
    ${this.filterImageCursor()}
    ${this.filterImageBack()}
    ${this.filterCursor()}
  </defs>
  ${this.drawVideoOrImage()}
  `;
  }

  drawBackgroundImage() {
    return `
      <image x="0" y="0" height="100%" width="100%" filter=url(#${this.filterBackId}) style="opacity:${this.opacityGrayScale}" xlink:href=${this.posterVideo.href} preserveAspectRatio="xMidYMid slice" />
      <g id="maskReveal" mask="url(#${this.particlesMaskId})">
        <image x="0" y="0" height="100%" width="100%" filter=url(#${this.filterCursorId})  xlink:href=${this.posterVideo.href} preserveAspectRatio="xMidYMid slice" />
      </g>`;
  }

  filterCursor() {
    return `<filter id="${this.idCursorFilter}"><feGaussianBlur in="SourceGraphic" stdDeviation="0" /></filter>`;
  }

  filterImageBack() {
    return `
    <filter id=${this.filterBackId}>
      <feColorMatrix type="matrix" values=".33 .33 .33 0 0
        .33 .33 .33 0 0
        .33 .33 .33 0 0
        0 0 0 1 0">
      </feColorMatrix>
    </filter>`;
  }

  filterImageCursor() {
    return `
    <filter id=${this.filterCursorId} filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values=".44 .44 .44 0 0
        .44 .44 .44 0 0
        .44 .44 .44 0 0
        0 0 0 1 0">
      </feColorMatrix>
      <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
        <feFuncR type="table" tableValues="0.55 0.25"></feFuncR>
        <feFuncG type="table" tableValues="0.06 1"></feFuncG>
        <feFuncB type="table" tableValues="0.93 0.91"></feFuncB>
        <feFuncA type="table" tableValues="0 1"></feFuncA>
      </feComponentTransfer>
    </filter>`;
  }
}
