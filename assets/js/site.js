/* ==========================================================================
   dawillah.com / site.js
   Vanilla JS: starfield, scroll reveals, nav spy, mobile menu,
   pointer spotlights, copy-to-clipboard, local clock.
   ========================================================================== */

(function () {
	"use strict";

	var doc = document;
	var body = doc.body;
	var root = doc.documentElement;
	var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	var finePointer = window.matchMedia("(pointer: fine)");

	function ready(fn) {
		if (doc.readyState === "loading") {
			doc.addEventListener("DOMContentLoaded", fn, { once: true });
		} else {
			fn();
		}
	}

	function onMediaChange(mq, fn) {
		if (typeof mq.addEventListener === "function") {
			mq.addEventListener("change", fn);
		} else if (typeof mq.addListener === "function") {
			mq.addListener(fn);
		}
	}

	/* ---------------------------------------------------------------- Clock */

	function initClock() {
		var clock = doc.getElementById("clock");
		if (!clock || typeof Intl === "undefined") return;

		var format;
		try {
			format = new Intl.DateTimeFormat("en-GB", {
				timeZone: "Asia/Kuala_Lumpur",
				hour: "2-digit",
				minute: "2-digit",
				hourCycle: "h23"
			});
		} catch (error) {
			clock.textContent = "GMT+8";
			return;
		}

		function tick() {
			clock.textContent = format.format(new Date());
		}

		tick();
		window.setInterval(tick, 30000);
	}

	/* ----------------------------------------------------------------- Year */

	function initYear() {
		var year = doc.getElementById("year");
		if (year) year.textContent = String(new Date().getFullYear());
	}

	/* ----------------------------------------------------------- Mobile menu */

	function initMobileMenu() {
		var toggle = doc.getElementById("menu-toggle");
		var menu = doc.getElementById("menu");
		if (!toggle || !menu) return;

		var links = menu.querySelectorAll("a");
		var desktop = window.matchMedia("(min-width: 1081px)");
		var pageMain = doc.getElementById("main");
		var pageFooter = doc.querySelector(".site-footer");

		function setInert(state) {
			if (pageMain) pageMain.inert = state;
			if (pageFooter) pageFooter.inert = state;
		}

		function open() {
			menu.classList.add("is-open");
			menu.setAttribute("aria-hidden", "false");
			toggle.setAttribute("aria-expanded", "true");
			toggle.setAttribute("aria-label", "Close menu");
			body.classList.add("menu-open");
			setInert(true);
			window.setTimeout(function () {
				if (menu.classList.contains("is-open") && links.length) {
					links[0].focus({ preventScroll: true });
				}
			}, 120);
		}

		function close(restoreFocus) {
			if (!menu.classList.contains("is-open")) return;
			menu.classList.remove("is-open");
			menu.setAttribute("aria-hidden", "true");
			toggle.setAttribute("aria-expanded", "false");
			toggle.setAttribute("aria-label", "Open menu");
			body.classList.remove("menu-open");
			setInert(false);
			if (restoreFocus) toggle.focus({ preventScroll: true });
		}

		toggle.addEventListener("click", function () {
			if (toggle.getAttribute("aria-expanded") === "true") {
				close(false);
			} else {
				open();
			}
		});

		Array.prototype.forEach.call(links, function (link) {
			link.addEventListener("click", function () {
				close(false);
			});
		});

		doc.addEventListener("keydown", function (event) {
			if (event.key === "Escape" && menu.classList.contains("is-open")) {
				close(true);
			}
		});

		onMediaChange(desktop, function (event) {
			if (event.matches) close(false);
		});
	}

	/* -------------------------------------------------------------- Progress */

	function initProgress() {
		var bar = doc.getElementById("progress-bar");
		if (!bar) return;
		var ticking = false;

		function update() {
			var max = root.scrollHeight - window.innerHeight;
			var ratio = max > 0 ? window.scrollY / max : 0;
			ratio = Math.max(0, Math.min(1, ratio));
			bar.style.transform = "scaleX(" + ratio + ")";
			ticking = false;
		}

		function request() {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		}

		window.addEventListener("scroll", request, { passive: true });
		window.addEventListener("resize", request);
		update();
	}

	/* ------------------------------------------------------------ Nav spy */

	function initNavSpy() {
		var links = Array.prototype.slice.call(doc.querySelectorAll("[data-nav]"));
		if (!links.length) return;

		var sections = links
			.map(function (link) {
				return doc.getElementById(link.getAttribute("data-nav"));
			})
			.filter(Boolean);

		if (!sections.length) return;

		var ticking = false;

		function update() {
			var marker = window.scrollY + window.innerHeight * 0.35;
			var current = "";

			sections.forEach(function (section) {
				var top = section.getBoundingClientRect().top + window.scrollY;
				if (top <= marker) current = section.id;
			});

			links.forEach(function (link) {
				var active = link.getAttribute("data-nav") === current;
				link.classList.toggle("active", active);
				if (active) {
					link.setAttribute("aria-current", "true");
				} else {
					link.removeAttribute("aria-current");
				}
			});

			ticking = false;
		}

		function request() {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(update);
		}

		window.addEventListener("scroll", request, { passive: true });
		window.addEventListener("resize", request);
		update();
	}

	/* --------------------------------------------------------- Scroll reveal */

	function initReveals() {
		var elements = Array.prototype.slice.call(doc.querySelectorAll("[data-reveal]"));
		if (!elements.length) return;

		// Optional per-element delay, then stagger within each group.
		doc.querySelectorAll("[data-stagger]").forEach(function (group) {
			var items = group.querySelectorAll("[data-reveal]");
			Array.prototype.forEach.call(items, function (item, index) {
				item.style.setProperty("--reveal-delay", Math.min(index * 70, 420) + "ms");
			});
		});

		elements.forEach(function (element) {
			var delay = element.getAttribute("data-delay");
			if (delay) element.style.setProperty("--reveal-delay", delay + "ms");
		});

		body.classList.add("reveal-ready");

		if (!("IntersectionObserver" in window) || reduceMotion.matches) {
			elements.forEach(function (element) {
				element.classList.add("is-visible");
			});
			return;
		}

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) return;
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				});
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
		);

		elements.forEach(function (element) {
			observer.observe(element);
		});
	}

	/* ----------------------------------------------------- Pointer spotlight */

	function initSpotlights() {
		if (!finePointer.matches) return;

		Array.prototype.forEach.call(doc.querySelectorAll(".project, .skill"), function (card) {
			card.addEventListener(
				"pointermove",
				function (event) {
					var rect = card.getBoundingClientRect();
					card.style.setProperty("--mx", event.clientX - rect.left + "px");
					card.style.setProperty("--my", event.clientY - rect.top + "px");
				},
				{ passive: true }
			);
		});
	}

	function initHeroGlow() {
		var hero = doc.querySelector(".hero");
		if (!hero || !finePointer.matches || reduceMotion.matches) return;

		hero.addEventListener(
			"pointermove",
			function (event) {
				var rect = hero.getBoundingClientRect();
				hero.style.setProperty("--mx", event.clientX - rect.left + "px");
				hero.style.setProperty("--my", event.clientY - rect.top + "px");
			},
			{ passive: true }
		);
	}

	/* ---------------------------------------------------------- Copy email */

	function initCopyEmail() {
		var button = doc.getElementById("copy-email");
		var toast = doc.getElementById("toast");
		if (!button) return;

		var email = "edham.arief@gmail.com";
		var label = button.querySelector(".copy-btn__label");
		var resetTimer = null;
		var toastTimer = null;

		function showToast(message) {
			if (!toast) return;
			toast.textContent = message;
			toast.classList.add("is-visible");
			window.clearTimeout(toastTimer);
			toastTimer = window.setTimeout(function () {
				toast.classList.remove("is-visible");
			}, 2600);
		}

		function markCopied() {
			button.classList.add("is-copied");
			button.setAttribute("aria-label", "Email address copied");
			if (label) label.textContent = "Copied";
			window.clearTimeout(resetTimer);
			resetTimer = window.setTimeout(function () {
				button.classList.remove("is-copied");
				button.setAttribute("aria-label", "Copy email address to clipboard");
				if (label) label.textContent = "Copy";
			}, 2400);
		}

		function fallbackCopy() {
			var field = doc.createElement("textarea");
			field.value = email;
			field.setAttribute("readonly", "");
			field.style.position = "fixed";
			field.style.top = "-1000px";
			field.style.opacity = "0";
			doc.body.appendChild(field);
			field.focus();
			field.select();
			var copied = false;
			try {
				copied = doc.execCommand("copy");
			} catch (error) {
				copied = false;
			}
			field.remove();
			return copied;
		}

		button.addEventListener("click", function () {
			var finish = function (copied) {
				if (copied) {
					markCopied();
					showToast("Email copied to clipboard");
				} else {
					showToast("Copy blocked. Use the email link");
				}
			};

			if (navigator.clipboard && window.isSecureContext) {
				navigator.clipboard.writeText(email).then(function () {
					finish(true);
				}).catch(function () {
					finish(fallbackCopy());
				});
			} else {
				finish(fallbackCopy());
			}
		});
	}

	/* ------------------------------------------------------------ Starfield */

	function initStarfield() {
		var canvas = doc.getElementById("starfield");
		if (!canvas) return;

		var ctx = canvas.getContext("2d");
		if (!ctx) return;

		var width = 0;
		var height = 0;
		var stars = [];
		var meteors = [];
		var frame = 0;
		var time = 0;
		var nextMeteor = 7;
		var resizeTimer = 0;
		var pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

		function build() {
			var dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth || window.innerWidth;
			height = canvas.clientHeight || window.innerHeight;
			canvas.width = Math.max(1, Math.floor(width * dpr));
			canvas.height = Math.max(1, Math.floor(height * dpr));
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			var total = Math.round((width * height) / 12000);
			total = Math.max(70, Math.min(200, total));
			stars = [];
			meteors = [];
			nextMeteor = time + 7 + Math.random() * 8;

			for (var i = 0; i < total; i++) {
				stars.push({
					x: Math.random() * width,
					y: Math.random() * height,
					radius: Math.random() * 1.15 + 0.3,
					depth: Math.random() * 0.85 + 0.15,
					alpha: Math.random() * 0.55 + 0.25,
					speed: Math.random() * 0.018 + 0.004,
					phase: Math.random() * Math.PI * 2
				});
			}
		}

		function spawnMeteor() {
			meteors.push({
				x: width * (0.25 + Math.random() * 0.6),
				y: -20,
				vx: -(2 + Math.random() * 1.3),
				vy: 2.7 + Math.random() * 1.4,
				life: 1
			});
		}

		function paint() {
			ctx.clearRect(0, 0, width, height);
			time += 0.012;
			pointer.x += (pointer.targetX - pointer.x) * 0.04;
			pointer.y += (pointer.targetY - pointer.y) * 0.04;

			var animate = !reduceMotion.matches;

			for (var i = 0; i < stars.length; i++) {
				var star = stars[i];

				if (animate) {
					star.y += star.speed;
					if (star.y > height + 2) {
						star.y = -2;
						star.x = Math.random() * width;
					}
				}

				var twinkle = 0.62 + 0.38 * Math.sin(time * 1.6 + star.phase);
				var x = star.x + pointer.x * star.depth * 14;
				var y = star.y + pointer.y * star.depth * 14;
				var alpha = star.alpha * twinkle;

				ctx.beginPath();
				ctx.arc(x, y, star.radius, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(216, 206, 255, " + alpha.toFixed(3) + ")";
				ctx.fill();
			}

			if (animate && time > nextMeteor) {
				spawnMeteor();
				nextMeteor = time + 10 + Math.random() * 11;
			}

			for (var m = meteors.length - 1; m >= 0; m--) {
				var meteor = meteors[m];
				meteor.x += meteor.vx;
				meteor.y += meteor.vy;
				meteor.life -= 0.009;

				if (meteor.life <= 0 || meteor.x < -160 || meteor.y > height + 160) {
					meteors.splice(m, 1);
					continue;
				}

				var tailX = meteor.x - meteor.vx * 22;
				var tailY = meteor.y - meteor.vy * 22;
				var fade = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
				fade.addColorStop(0, "rgba(245, 240, 255, " + (0.6 * meteor.life).toFixed(3) + ")");
				fade.addColorStop(1, "rgba(196, 181, 253, 0)");
				ctx.beginPath();
				ctx.moveTo(meteor.x, meteor.y);
				ctx.lineTo(tailX, tailY);
				ctx.strokeStyle = fade;
				ctx.lineWidth = 1.3;
				ctx.stroke();
			}

			if (animate) {
				frame = window.requestAnimationFrame(paint);
			}
		}

		function restart() {
			window.cancelAnimationFrame(frame);
			paint();
		}

		build();
		restart();

		window.addEventListener(
			"resize",
			function () {
				window.clearTimeout(resizeTimer);
				resizeTimer = window.setTimeout(function () {
					build();
					restart();
				}, 150);
			},
			{ passive: true }
		);

		if (finePointer.matches) {
			window.addEventListener(
				"pointermove",
				function (event) {
					pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
					pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
				},
				{ passive: true }
			);
		}

		doc.addEventListener("visibilitychange", function () {
			if (doc.hidden) {
				window.cancelAnimationFrame(frame);
			} else {
				restart();
			}
		});

		onMediaChange(reduceMotion, function () {
			restart();
		});
	}

	/* ---------------------------------------------------------------- Boot */

	ready(function () {
		initClock();
		initYear();
		initMobileMenu();
		initProgress();
		initNavSpy();
		initReveals();
		initSpotlights();
		initHeroGlow();
		initCopyEmail();
		initStarfield();
	});
})();
