const mobileBtn = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.menu');
const mobileBtnClose = document.querySelector('.close-btn')
const weddingDate = 'November 9, 2024 18:00:00';
const cdDays = document.querySelector('#days');
const cdHours = document.querySelector('#hours');
const cdMinutes = document.querySelector('#minutes');
const cdSeconds = document.querySelector('#seconds');
const mobileMenuOptions = document.querySelectorAll('.mobile-option');
const mapBtns = document.querySelectorAll('.btn-info-ext');
const passesInput = document.querySelector('#pass-input');
const passBtns = document.querySelectorAll('.pass-button');
const confirmDialog = document.querySelector('#confirm-dialog');
const cancelConfirmDialog = document.querySelector('#cancel-confirm-dialog');
const errorDialog = document.querySelector('#error-dialog');
const confirmBtn = document.querySelector('#confirm-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const closeBtnConfirmDialog = document.querySelector('#close-btn-confirm-dialog');
const closeBtnCancelDialog = document.querySelector('#close-btn-cancel-dialog');
const closeBtnErrorDialog = document.querySelector('#close-btn-error-dialog')
const form = document.querySelector('.form');
const iconScrollArrow = document.querySelector('.icon-scroll-arrow');
const imgsGallery = document.querySelectorAll('.img-gallery')
const instrBugambiliasJardinBtns = document.querySelectorAll('.btn-instructions');
const countdownTitle = document.querySelector('.countdown-title');

const URLidGuest = window.location.search.substring(window.location.search.indexOf('guest=') + 6);
// console.log("guest id: ", URLidGuest);
const URLconfirmGuest = `https://www.weddinglink.io/invitation/confirm/${URLidGuest}`
// const URLconfirmGuest = `http://localhost:8080/invitation/confirm/${URLidGuest}`

//const URLPdfJardinLasBugambilias = 'http://192.168.1.64:8080/invitation/instructions/las-bugambilias-jardin';
//const URLPdfJardinLasBugambilias = 'http://localhost:8080/invitation/instructions/las-bugambilias-jardin';
const URLPdfJardinLasBugambilias = 'https://www.weddinglink.io/invitation/instructions/las-bugambilias-jardin';

let pdfJardinLasBugambilias;
async function getPdfBugambilas() {
    pdfJardinLasBugambilias = await getLasBugambiliasJardinInstructions(URLPdfJardinLasBugambilias);
}

//re comenta para evitar error por backend
//getPdfBugambilas();


// spinner
const spinner = document.querySelector('.spinner');
function hideSpinner(spinner) {
    spinner.classList.add('hide');
}
function showSpinner(spinner) {
    spinner.classList.remove('hide');
}

function hideElement(element) {
    element.classList.add('hide');
}

function showElement(element) {
    element.classList.remove('hide');
}
// mostrar el spinner en el boton
// si aun no se carga el archivo pdf en la variable mostrar un alert
instrBugambiliasJardinBtns.forEach(instrBtn => {
    instrBtn.addEventListener('click', () => {
        // const pdfFile = await getLasBugambiliasJardinInstructions(URLPdfJardinLasBugambilias, instrBtn.children[1], instrBtn.children[0]);

        //comentado para evitar error al no exitir archivo
        // if (pdfJardinLasBugambilias) {
        //     window.open(pdfJardinLasBugambilias, "_blank");
        // } else {
        //     window.alert("El archivo se esta cargando, espere e intente de nuevo.")
        // }

        // console.log("Button: ", instrBtn);
        // console.log("span: ", instrBtn.children)
    })
})

// para evitar que al hacer click sobre una de las opciones del menu
// desaparezcan estas por el comportamiento del menu mobile
let windowSize = window.innerWidth;
addEventListener('resize', () => {
    windowSize = window.innerWidth;
})


closeBtnCancelDialog.addEventListener('click', () => {
    cancelConfirmDialog.close();
})

closeBtnConfirmDialog.addEventListener('click', () => {
    confirmDialog.close()
})

closeBtnErrorDialog.addEventListener('click', () => {
    errorDialog.close()
})

function confirmInvitation(url, state, modal, numberOfPasses = 0) {
    showSpinner(spinner);
    // fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify({ confirm_state: state, confirmedPasses: numberOfPasses }),
    //     headers: { "Content-Type": "application/json" }
    // })
    //     .then(res => res.json())
    //     .catch(err => {
    //         console.log("ERROR:", err)
    //         errorDialog.showModal()
    //     })
    //     .then(response => {
    //         hideSpinner(spinner);
    //         // console.log('Success: ', response)
    //         if (response.msg === 'Invitation Confirmed') {
    //             modal.showModal();
    //             if (state == true) {
    //                 jsConfetti.addConfetti({
    //                     confettiRadius: 4,
    //                     confettiNumber: 400,
    //                 })
    //             }
    //         }
    //     })

    // fetch simulation
    setTimeout(() => {
        hideSpinner(spinner)
        if (state) {
            modal.showModal()
            jsConfetti.addConfetti({
                confettiRadius: 4,
                confettiNumber: 400,
            })
        } else {
            modal.showModal()
        }
    }, 3000)


}

async function getLasBugambiliasJardinInstructions(url) {
    let pdfFile
    // hideElement(txtBtn)
    // showElement(spinner)
    const getPdfFile = async () => {
        await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json();
                }
                return res.blob();
            })
            .catch(err => {
                console.log("catch: ", err)
                // showElement(txtBtn)
                // hideElement(spinner)
                window.alert("Error:\nNo pudo realizarse la coneccion.\n" + err)
                throw new Error(err)
            })
            .then(pdfBlob => {
                // hideElement(spinner)
                // showElement(txtBtn)
                if (pdfBlob.error === true) {
                    window.alert(pdfBlob.msg);
                    return
                } else {
                    // console.log(pdfBlob);
                    const pdfURL = URL.createObjectURL(pdfBlob)
                    pdfFile = pdfURL;
                }
            })
        return pdfFile;
    }
    const pdfDocument = await getPdfFile();
    return pdfDocument;
}

confirmBtn.addEventListener('click', () => {
    confirmInvitation(URLconfirmGuest, true, confirmDialog, Number(passesInput.value))
})

cancelBtn.addEventListener('click', () => {
    confirmInvitation(URLconfirmGuest, false, cancelConfirmDialog)
})

var JSConfetti = function () { "use strict"; function t(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } function e(t, e) { for (var i = 0; i < e.length; i++) { var n = e[i]; n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n) } } function i(t, i, n) { return i && e(t.prototype, i), n && e(t, n), t } function n(t) { return +t.replace(/px/, "") } function s(t, e) { var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = Math.random() * (e - t) + t; return Math.floor(n * Math.pow(10, i)) / Math.pow(10, i) } function o(t) { return t[s(0, t.length)] } var a = ["#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"]; function r(t) { return Math.log(t) / Math.log(1920) } var h = function () { function e(i) { t(this, e); var n = i.initialPosition, a = i.direction, h = i.confettiRadius, c = i.confettiColors, u = i.emojis, l = i.emojiSize, d = i.canvasWidth, f = s(.9, 1.7, 3) * r(d); this.confettiSpeed = { x: f, y: f }, this.finalConfettiSpeedX = s(.2, .6, 3), this.rotationSpeed = u.length ? .01 : s(.03, .07, 3) * r(d), this.dragForceCoefficient = s(5e-4, 9e-4, 6), this.radius = { x: h, y: h }, this.initialRadius = h, this.rotationAngle = "left" === a ? s(0, .2, 3) : s(-.2, 0, 3), this.emojiSize = l, this.emojiRotationAngle = s(0, 2 * Math.PI), this.radiusYUpdateDirection = "down"; var m = "left" === a ? s(82, 15) * Math.PI / 180 : s(-15, -82) * Math.PI / 180; this.absCos = Math.abs(Math.cos(m)), this.absSin = Math.abs(Math.sin(m)); var v = s(-150, 0), p = { x: n.x + ("left" === a ? -v : v) * this.absCos, y: n.y - v * this.absSin }; this.currentPosition = Object.assign({}, p), this.initialPosition = Object.assign({}, p), this.color = u.length ? null : o(c), this.emoji = u.length ? o(u) : null, this.createdAt = (new Date).getTime(), this.direction = a } return i(e, [{ key: "draw", value: function (t) { var e = this.currentPosition, i = this.radius, n = this.color, s = this.emoji, o = this.rotationAngle, a = this.emojiRotationAngle, r = this.emojiSize, h = window.devicePixelRatio; n ? (t.fillStyle = n, t.beginPath(), t.ellipse(e.x * h, e.y * h, i.x * h, i.y * h, o, 0, 2 * Math.PI), t.fill()) : s && (t.font = "".concat(r, "px serif"), t.save(), t.translate(h * e.x, h * e.y), t.rotate(a), t.textAlign = "center", t.fillText(s, 0, 0), t.restore()) } }, { key: "updatePosition", value: function (t, e) { var i = this.confettiSpeed, n = this.dragForceCoefficient, s = this.finalConfettiSpeedX, o = this.radiusYUpdateDirection, a = this.rotationSpeed, r = this.createdAt, h = this.direction, c = e - r; i.x > s && (this.confettiSpeed.x -= n * t), this.currentPosition.x += i.x * ("left" === h ? -this.absCos : this.absCos) * t, this.currentPosition.y = this.initialPosition.y - i.y * this.absSin * c + .00125 * Math.pow(c, 2) / 2, this.rotationSpeed -= this.emoji ? 1e-4 : 1e-5 * t, this.rotationSpeed < 0 && (this.rotationSpeed = 0), this.emoji ? this.emojiRotationAngle += this.rotationSpeed * t % (2 * Math.PI) : "down" === o ? (this.radius.y -= t * a, this.radius.y <= 0 && (this.radius.y = 0, this.radiusYUpdateDirection = "up")) : (this.radius.y += t * a, this.radius.y >= this.initialRadius && (this.radius.y = this.initialRadius, this.radiusYUpdateDirection = "down")) } }, { key: "getIsVisibleOnCanvas", value: function (t) { return this.currentPosition.y < t + 100 } }]), e }(); function c() { var t = document.createElement("canvas"); return t.style.position = "fixed", t.style.width = "100%", t.style.height = "100%", t.style.top = "0", t.style.left = "0", t.style.zIndex = "1000", t.style.pointerEvents = "none", document.body.appendChild(t), t } function u(t) { var e = t.confettiRadius, i = void 0 === e ? 6 : e, n = t.confettiNumber, s = void 0 === n ? t.confettiesNumber || (t.emojis ? 40 : 250) : n, o = t.confettiColors, r = void 0 === o ? a : o, h = t.emojis, c = void 0 === h ? t.emojies || [] : h, u = t.emojiSize, l = void 0 === u ? 80 : u; return t.emojies && console.error("emojies argument is deprecated, please use emojis instead"), t.confettiesNumber && console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"), { confettiRadius: i, confettiNumber: s, confettiColors: r, emojis: c, emojiSize: l } } var l = function () { function e(i) { var n = this; t(this, e), this.canvasContext = i, this.shapes = [], this.promise = new Promise((function (t) { return n.resolvePromise = t })) } return i(e, [{ key: "getBatchCompletePromise", value: function () { return this.promise } }, { key: "addShapes", value: function () { var t; (t = this.shapes).push.apply(t, arguments) } }, { key: "complete", value: function () { var t; return !this.shapes.length && (null === (t = this.resolvePromise) || void 0 === t || t.call(this), !0) } }, { key: "processShapes", value: function (t, e, i) { var n = this, s = t.timeDelta, o = t.currentTime; this.shapes = this.shapes.filter((function (t) { return t.updatePosition(s, o), t.draw(n.canvasContext), !i || t.getIsVisibleOnCanvas(e) })) } }]), e }(); return function () { function e() { var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}; t(this, e), this.activeConfettiBatches = [], this.canvas = i.canvas || c(), this.canvasContext = this.canvas.getContext("2d"), this.requestAnimationFrameRequested = !1, this.lastUpdated = (new Date).getTime(), this.iterationIndex = 0, this.loop = this.loop.bind(this), requestAnimationFrame(this.loop) } return i(e, [{ key: "loop", value: function () { var t, e, i, s, o; this.requestAnimationFrameRequested = !1, t = this.canvas, e = window.devicePixelRatio, i = getComputedStyle(t), s = n(i.getPropertyValue("width")), o = n(i.getPropertyValue("height")), t.setAttribute("width", (s * e).toString()), t.setAttribute("height", (o * e).toString()); var a = (new Date).getTime(), r = a - this.lastUpdated, h = this.canvas.offsetHeight, c = this.iterationIndex % 10 == 0; this.activeConfettiBatches = this.activeConfettiBatches.filter((function (t) { return t.processShapes({ timeDelta: r, currentTime: a }, h, c), !c || !t.complete() })), this.iterationIndex++, this.queueAnimationFrameIfNeeded(a) } }, { key: "queueAnimationFrameIfNeeded", value: function (t) { this.requestAnimationFrameRequested || this.activeConfettiBatches.length < 1 || (this.requestAnimationFrameRequested = !0, this.lastUpdated = t || (new Date).getTime(), requestAnimationFrame(this.loop)) } }, { key: "addConfetti", value: function () { for (var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = u(t), i = e.confettiRadius, n = e.confettiNumber, s = e.confettiColors, o = e.emojis, a = e.emojiSize, r = this.canvas.getBoundingClientRect(), c = r.width, d = r.height, f = 5 * d / 7, m = { x: 0, y: f }, v = { x: c, y: f }, p = new l(this.canvasContext), g = 0; g < n / 2; g++) { var y = new h({ initialPosition: m, direction: "right", confettiRadius: i, confettiColors: s, confettiNumber: n, emojis: o, emojiSize: a, canvasWidth: c }), C = new h({ initialPosition: v, direction: "left", confettiRadius: i, confettiColors: s, confettiNumber: n, emojis: o, emojiSize: a, canvasWidth: c }); p.addShapes(y, C) } return this.activeConfettiBatches.push(p), this.queueAnimationFrameIfNeeded(), p.getBatchCompletePromise() } }, { key: "clearCanvas", value: function () { this.activeConfettiBatches = [] } }]), e }() }();

// Confetti opt2
const jsConfetti = new JSConfetti();

// Confeti
var Confetti = function () { var t = function () { return function () { this.gravity = 10, this.particle_count = 75, this.particle_size = 1, this.explosion_power = 25, this.destroy_target = !0, this.fade = !1 } }(), e = function () { function e(n) { var r = this; if (this.bursts = [], this.setCount = function (t) { if ("number" != typeof t) throw new Error("Input must be of type 'number'"); e.CONFIG.particle_count = t }, this.setPower = function (t) { if ("number" != typeof t) throw new Error("Input must be of type 'number'"); e.CONFIG.explosion_power = t }, this.setSize = function (t) { if ("number" != typeof t) throw new Error("Input must be of type 'number'"); e.CONFIG.particle_size = t }, this.setFade = function (t) { if ("boolean" != typeof t) throw new Error("Input must be of type 'boolean'"); e.CONFIG.fade = t }, this.destroyTarget = function (t) { if ("boolean" != typeof t) throw new Error("Input must be of type 'boolean'"); e.CONFIG.destroy_target = t }, this.setupCanvasContext = function () { if (!e.CTX) { var t = document.createElement("canvas"); e.CTX = t.getContext("2d"), t.width = 2 * window.innerWidth, t.height = 2 * window.innerHeight, t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.width = "calc(100%)", t.style.height = "calc(100%)", t.style.margin = "0", t.style.padding = "0", t.style.zIndex = "999999999", t.style.pointerEvents = "none", document.body.appendChild(t), window.addEventListener("resize", function () { t.width = 2 * window.innerWidth, t.height = 2 * window.innerHeight }) } }, this.setupElement = function (t) { var n; r.element = document.getElementById(t), null === (n = r.element) || void 0 === n || n.addEventListener("click", function (t) { var n = new o(2 * t.clientX, 2 * t.clientY); r.bursts.push(new i(n)), e.CONFIG.destroy_target && (r.element.style.visibility = "hidden") }) }, this.update = function (t) { r.delta_time = (t - r.time) / 1e3, r.time = t; for (var e = r.bursts.length - 1; e >= 0; e--)r.bursts[e].update(r.delta_time), 0 == r.bursts[e].particles.length && r.bursts.splice(e, 1); r.draw(), window.requestAnimationFrame(r.update) }, !n) throw new Error("Missing id"); e.CONFIG || (e.CONFIG = new t), this.time = (new Date).getTime(), this.delta_time = 0, this.setupCanvasContext(), this.setupElement(n), window.requestAnimationFrame(this.update) } return e.prototype.draw = function () { s.clearScreen(); for (var t = 0, e = this.bursts; t < e.length; t++) { e[t].draw() } }, e }(), i = function () { function t(t) { this.particles = []; for (var i = 0; i < e.CONFIG.particle_count; i++)this.particles.push(new n(t)) } return t.prototype.update = function (t) { for (var e = this.particles.length - 1; e >= 0; e--)this.particles[e].update(t), this.particles[e].checkBounds() && this.particles.splice(e, 1) }, t.prototype.draw = function () { for (var t = this.particles.length - 1; t >= 0; t--)this.particles[t].draw() }, t }(), n = function () { function t(t) { this.size = new o((16 * Math.random() + 4) * e.CONFIG.particle_size, (4 * Math.random() + 4) * e.CONFIG.particle_size), this.position = new o(t.x - this.size.x / 2, t.y - this.size.y / 2), this.velocity = r.generateVelocity(), this.rotation = 360 * Math.random(), this.rotation_speed = 10 * (Math.random() - .5), this.hue = 360 * Math.random(), this.opacity = 100, this.lifetime = Math.random() + .25 } return t.prototype.update = function (t) { this.velocity.y += e.CONFIG.gravity * (this.size.y / (10 * e.CONFIG.particle_size)) * t, this.velocity.x += 25 * (Math.random() - .5) * t, this.velocity.y *= .98, this.velocity.x *= .98, this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.rotation += this.rotation_speed, e.CONFIG.fade && (this.opacity -= this.lifetime) }, t.prototype.checkBounds = function () { return this.position.y - 2 * this.size.x > 2 * window.innerHeight }, t.prototype.draw = function () { s.drawRectangle(this.position, this.size, this.rotation, this.hue, this.opacity) }, t }(), o = function () { return function (t, e) { this.x = t || 0, this.y = e || 0 } }(), r = function () { function t() { } return t.generateVelocity = function () { var t = Math.random() - .5, i = Math.random() - .7, n = Math.sqrt(t * t + i * i); return i /= n, new o((t /= n) * (Math.random() * e.CONFIG.explosion_power), i * (Math.random() * e.CONFIG.explosion_power)) }, t }(), s = function () { function t() { } return t.clearScreen = function () { e.CTX && e.CTX.clearRect(0, 0, 2 * window.innerWidth, 2 * window.innerHeight) }, t.drawRectangle = function (t, i, n, o, r) { e.CTX && (e.CTX.save(), e.CTX.beginPath(), e.CTX.translate(t.x + i.x / 2, t.y + i.y / 2), e.CTX.rotate(n * Math.PI / 180), e.CTX.rect(-i.x / 2, -i.y / 2, i.x, i.y), e.CTX.fillStyle = "hsla(" + o + "deg, 90%, 65%, " + r + "%)", e.CTX.fill(), e.CTX.restore()) }, t }(); return e }();

// Pass in the id of an element
// let confetti = new Confetti('confirm-btn');

// Edit given parameters
// confetti.setCount(75);
// confetti.setSize(1);
// confetti.setPower(25);
// confetti.setFade(false);
// confetti.destroyTarget(false);


// Funcion para poder agregar o quitar pases en la confirmacion de asistencia
passBtns.forEach(button => {
    button.addEventListener('click', (event) => {

        event.preventDefault();

        // Solamente podra agregar pases si no es mayor al numero de pases de la invitacion
        if (button.id == "add-pass") {
            if (Number(passesInput.value) < Number(passesInput.max)) {
                passesInput.value = Number(passesInput.value) + 1;
            }
        }

        // Podra eliminar pases de la invitacion en caso de no requerir el total de pases que se le estan enviando
        if (button.id == "remove-pass") {
            if (Number(passesInput.value) > 1) {
                passesInput.value = Number(passesInput.value) - 1;
            }
        }
    })
})

// START slider
const images = document.querySelectorAll('.slider');
const listOfImg = {};
let position = 1;

images.forEach(img => {
    listOfImg[position] = img;
    position++;
    if (position > 4) {
        position = 1;
    }
})

function cleanImages() {
    images.forEach(img => {
        img.classList.remove("show");
        img.classList.remove("grow");
    })
}

function showImage() {
    let actualImg;
    let nextImg;

    switch (position) {
        case 1:
            cleanImages();
            actualImg = listOfImg[4];
            nextImg = listOfImg[3];
            actualImg.classList = actualImg.classList + " grow show";
            nextImg.classList = nextImg.classList + " show";
            break;
        case 2:
            cleanImages();
            actualImg = listOfImg[3];
            nextImg = listOfImg[2];
            actualImg.classList = actualImg.classList + " grow show";
            nextImg.classList = nextImg.classList + " show";
            break;
        case 3:
            cleanImages();
            actualImg = listOfImg[2];
            nextImg = listOfImg[1];
            actualImg.classList = actualImg.classList + " grow show";
            nextImg.classList = nextImg.classList + " show";
            break;
        case 4:
            cleanImages();
            actualImg = listOfImg[1];
            actualImg.classList = actualImg.classList + " grow show";
            break;
    }
    if (position < 4) {
        position++
    } else {
        position = 1
    }
}

showImage()
setInterval(showImage, 6000);

// END slider


const mapBtnsId = {
    "btn-map-ceremony": "https://maps.app.goo.gl/paAdegfNabbAFRpo6",
    "btn-map-civil": "https://maps.app.goo.gl/2VWE3sx5rexsFr2U9",
    "btn-map-reception": "https://maps.app.goo.gl/p77Po8vdsEZFArgP6",
    "btn-map-after": "https://maps.app.goo.gl/N9StuZ2RNBkZ4H9z6"
}
const ubicacion = mapBtnsId["btn-map-reception"]

mapBtns.forEach(mapBtn => {
    mapBtn.addEventListener('click', () => {
        window.open(mapBtnsId[mapBtn.id])
    })
})

mobileMenuOptions.forEach(option => {
    option.addEventListener('click', () => {
        setTimeout(() => {
            if (windowSize < 1000) {
                mobileMenu.style.transform = 'translateX(100vw)';
            }

        }, 500)

    })
})


mobileBtn.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(0vw)';
})

mobileBtnClose.addEventListener('click', () => {
    mobileMenu.style.transform = 'translateX(100vw)';
})

function getCountDownDate() {
    const date = weddingDate;
    const countDate = new Date(date).getTime()
    const todaysTime = new Date().getTime()
    const gap = countDate - todaysTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDays = Math.floor(gap / day)
    const textHours = Math.floor((gap % day) / hour);
    const textMinutes = Math.floor((gap % hour) / minute);
    const textSeconds = Math.floor((gap % minute) / second);

    if (textDays <= 0 && textHours <= 0 && textMinutes <= 0 && textSeconds <= 0) {
        countdownTitle.innerHTML = '¡Gracias por acompañarnos!'
        cdDays.innerHTML = '0';
        cdHours.innerHTML = '0';
        cdMinutes.innerHTML = '0';
        cdSeconds.innerHTML = '0';
    } else {
        cdDays.innerHTML = textDays;
        cdHours.innerHTML = textHours;
        cdMinutes.innerHTML = textMinutes;
        cdSeconds.innerHTML = textSeconds;
    }

}

setInterval(getCountDownDate, 1000);

// Observador
const scrollArroIconwAndImagesController = (entradas, observador) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {

            if (entrada.target.classList.contains('form')) {
                iconScrollArrow.style.opacity = 0;
            }

            if (entrada.target.classList.contains('img-gallery')) {
                entrada.target.classList.add('visible');
            }
        }

        if (!entrada.isIntersecting && entrada.target.classList.contains('form')) {
            iconScrollArrow.style.opacity = 1;
        }
    })
}


const observerController = new IntersectionObserver(scrollArroIconwAndImagesController, {
    root: null,
    rootMargin: '0px 150px 0px 150px',
    threshold: .5
})

imgsGallery.forEach(img => {
    observerController.observe(img)
})

observerController.observe(form);