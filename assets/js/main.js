(function () {

	var mqMedium = window.matchMedia('(max-width: 980px)');
	var isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

	// Parallax background scroll effect.
	function applyParallax(el, intensity) {
		if (isMobile) return;
		if (!intensity) intensity = 0.25;

		var active = !mqMedium.matches;

		function update() {
			if (!active) return;
			var pos = -el.getBoundingClientRect().top;
			el.style.backgroundPosition = 'center ' + (pos * -intensity) + 'px';
		}

		mqMedium.addEventListener('change', function (e) {
			active = !e.matches;
			if (!active) el.style.backgroundPosition = '';
			else update();
		});

		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		update();
	}

	document.addEventListener('DOMContentLoaded', function () {

		var body = document.body;
		var header = document.querySelector('#header');
		var banner = document.querySelector('#banner');
		var wrapper = document.querySelector('#wrapper');

		// Disable animations until page has loaded.
		body.classList.add('is-loading');
		window.addEventListener('load', function () {
			setTimeout(function () { body.classList.remove('is-loading'); }, 100);
		});

		// Clear transitioning state on page hide.
		window.addEventListener('pagehide', function () {
			setTimeout(function () {
				document.querySelectorAll('.is-transitioning').forEach(function (el) {
					el.classList.remove('is-transitioning');
				});
			}, 250);
		});

		// Smooth scroll for .scrolly links, offset by header height.
		document.querySelectorAll('a.scrolly').forEach(function (link) {
			link.addEventListener('click', function (e) {
				var target = document.querySelector(this.getAttribute('href'));
				if (!target) return;
				e.preventDefault();
				var offset = header ? header.offsetHeight - 2 : 0;
				window.scrollTo({
					top: target.getBoundingClientRect().top + window.scrollY - offset,
					behavior: 'smooth'
				});
			});
		});

		// Tiles: set background images and wire up link transitions.
		document.querySelectorAll('.tiles > article').forEach(function (article) {
			var imageEl = article.querySelector('.image');
			var img = imageEl && imageEl.querySelector('img');
			var link = article.querySelector('.link');

			if (img) {
				article.style.backgroundImage = 'url(' + img.getAttribute('src') + ')';
				var pos = img.getAttribute('data-position');
				if (pos && imageEl) imageEl.style.backgroundPosition = pos;
				if (imageEl) imageEl.style.display = 'none';
			}

			if (link) {
				var clone = link.cloneNode(false);
				clone.textContent = '';
				clone.classList.add('primary');
				article.appendChild(clone);

				[link, clone].forEach(function (l) {
					l.addEventListener('click', function (e) {
						var href = link.getAttribute('href');
						e.preventDefault();
						e.stopPropagation();
						article.classList.add('is-transitioning');
						if (wrapper) wrapper.classList.add('is-transitioning');
						setTimeout(function () {
							if (link.getAttribute('target') === '_blank')
								window.open(href);
							else
								window.location.href = href;
						}, 500);
					});
				});
			}
		});

		// Header: toggle alt class based on banner visibility (replaces scrollex).
		window.addEventListener('load', function () {
			if (banner && header && header.classList.contains('alt')) {
				var observer = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							header.classList.add('alt');
							header.classList.remove('reveal');
						} else {
							header.classList.remove('alt');
							header.classList.add('reveal');
						}
					});
				}, {
					rootMargin: '-' + (header.offsetHeight + 10) + 'px 0px 0px 0px'
				});
				observer.observe(banner);
			}
		});

		// Banner: background image and parallax.
		if (banner) {
			var bannerImageEl = banner.querySelector('.image');
			var bannerImg = bannerImageEl && bannerImageEl.querySelector('img');
			if (bannerImg) {
				banner.style.backgroundImage = 'url(' + bannerImg.getAttribute('src') + ')';
				bannerImageEl.style.display = 'none';
			}
			applyParallax(banner, 0.275);
		}

		// Menu.
		var menu = document.querySelector('#menu');
		if (menu) {

			// Wrap existing menu contents in an inner div.
			var inner = document.createElement('div');
			inner.className = 'inner';
			while (menu.firstChild) inner.appendChild(menu.firstChild);
			menu.appendChild(inner);

			// Debounce lock to prevent rapid open/close toggling during animation.
			var locked = false;
			function lock() {
				if (locked) return false;
				locked = true;
				setTimeout(function () { locked = false; }, 350);
				return true;
			}

			function hideMenu() { if (lock()) body.classList.remove('is-menu-visible'); }
			function toggleMenu() { if (lock()) body.classList.toggle('is-menu-visible'); }

			// Clicks inside inner stop propagation; link clicks navigate after hiding.
			inner.addEventListener('click', function (e) {
				e.stopPropagation();
				var a = e.target.closest('a');
				if (!a) return;
				var href = a.getAttribute('href');
				e.preventDefault();
				hideMenu();
				setTimeout(function () { window.location.href = href; }, 250);
			});

			// Clicking the backdrop (menu element itself) closes the menu.
			menu.addEventListener('click', function (e) {
				e.stopPropagation();
				body.classList.remove('is-menu-visible');
			});

			// Close button.
			var closeBtn = document.createElement('a');
			closeBtn.className = 'close';
			closeBtn.href = '#menu';
			closeBtn.textContent = 'Close';
			closeBtn.addEventListener('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				body.classList.remove('is-menu-visible');
			});
			menu.appendChild(closeBtn);

			// Move menu to body (keeps it outside the wrapper for z-index stacking).
			document.body.appendChild(menu);

			// Toggle on hamburger click; hide on any other document click.
			document.addEventListener('click', function (e) {
				if (e.target.closest('a[href="#menu"]')) {
					e.preventDefault();
					e.stopPropagation();
					toggleMenu();
				} else {
					hideMenu();
				}
			});

			// Hide on Escape key.
			document.addEventListener('keydown', function (e) {
				if (e.key === 'Escape') hideMenu();
			});
		}

	});

})();
