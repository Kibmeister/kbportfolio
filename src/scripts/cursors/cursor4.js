import { Cursors } from './../cursors';
import { isTouchDevices, isSafari } from './../utils';
export class Cursor4 extends Cursors {
  constructor(index) {
    super(index);
    this.speed = !isTouchDevices ? (!isSafari ? 0.4 : 0.9) : 1;
    this.delta = !isTouchDevices ? (!isSafari ? 0.15 : 0.05) : 0.2;
    this.videoUrlDesktop = new URL(
      '../../video/space_desktop.mp4',
      import.meta.url
    );
    this.videoUrlMobile = new URL(
      '../../video/space_mobile.mp4',
      import.meta.url
    );
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
    this.radiusCursorBack = 32;
    this.radiusCursor = 16;
    this.strokeColorCursorBack = getComputedStyle(
      document.body
    ).getPropertyValue('--white');
    this.fillCursor = getComputedStyle(document.body).getPropertyValue(
      '--white'
    );
    this.maxSqueeze = 0.1;
    this.accelerator = 1000;
  }

  setParamsParticles() {
    this.nbrParticles = !isTouchDevices ? (!isSafari ? 120 : 15) : 40;
    this.radiusStart = this.diagonalWindow() / 35;
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
    this.maskCursor = {
      videoDesktop: this.videoUrlDesktop.href,
      videoMobile: this.videoUrlMobile.href,
    };
  }

  drawMaskCursor() {
    return `
    <defs>
      <radialGradient id="${this.idMask}">
        <stop offset="0%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#fff"/>
      </radialGradient>
      <mask id=${this.particlesMaskId}>${this.drawParticles()}</mask>
      ${this.filterImageCursor()}
     
      ${this.filterCursor()}
    </defs>
    ${this.drawVideoOrImage()}`;
  }

  //TODO: there is a glitch with how the cursor is displayed in safari
  drawVideoOrImage() {
    if (!isSafari) {
      return `
      <g id="maskReveal" mask="url(#${this.particlesMaskId})">
        <foreignObject x="0" y="0" width="100%" height="100%" filter=url(#${
          this.filterCursorId
        })>${this.insertVideo()}</foreignObject>
      </g>`;
    } else {
      return `
      <g id="maskReveal" mask="url(#${this.particlesMaskId})">
        <image x="0" y="0" height="100%" width="100%" filter=url(#${this.filterCursorId})  xlink:href=${this.posterVideo.href} preserveAspectRatio="xMidYMid slice" />
      </g>`;
    }
  }

  insertVideo() {
    return `
    <video width="100%" height="100%" controls="false" autoplay loop="true" muted crossorigin=anonymous >
    </video>`;
  }
  //safari
  filterCursor() {
    return `<filter id="${this.idCursorFilter}"><feGaussianBlur in="SourceGraphic" stdDeviation="0" /></filter>`;
  }

  // filterImageBack() {
  //   return `
  //   <filter id=${this.filterBackId}>
  //     <feColorMatrix type="matrix" values=".33 .33 .33 0 0
  //       .33 .33 .33 0 0
  //       .33 .33 .33 0 0
  //       0 0 0 1 0">
  //     </feColorMatrix>
  //   </filter>`;
  // }

  // sets the color for the cursor

  filterImageCursor() {
    return `
  <filter id=${this.filterCursorId} filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feColorMatrix type="matrix" values=".44 .44 .44 0 0
    .44 .44 .44 0 0
    .44 .44 .44 0 0
    0 0 0 1 0">
  </feColorMatrix>
  <feComponentTransfer color-interpolation-filters="sRGB" result="duotone">
    <feFuncR type="table" tableValues="1 1"></feFuncR>
    <feFuncG type="table" tableValues="1 0.8"></feFuncG>
    <feFuncB type="table" tableValues="0 0"></feFuncB>
    <feFuncA type="table" tableValues="0 1"></feFuncA>
  </feComponentTransfer>
  </filter>`;
  }
}
