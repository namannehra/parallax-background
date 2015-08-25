'use strict';
Polymer({
	is: 'parallax-background',
	properties: {
		/*
		Number of balls.
		*/
		number: {
			type: Number,
			value: 8
		},
		/*
		'multiplier' is used to set size of balls.
		Diameter of all balls is a multiple of 'multiplier'.
		*/
		multiplier: {
			type: Number,
			value: 64
		},
		/*
		'min' is used to set size of smallest balls.
		Diameter of smallest balls is equal to multiplier * min.
		*/
		min: {
			type: Number,
			value: 3
		},
		/*
		'max' is used to set size of largest balls.
		Diameter of largest balls is equal to multiplier * max.
		*/
		max: {
			type: Number,
			value: 10
		},
		/**
		'inertia' is used to set the speed of balls.
		Increasing 'inertia' makes the balls slower.
		*/
		inertia: {
			type: Number,
			value: 2
		},
	},
	_chill: false,
	_contentHeight: 0,
	_balls: [],
	_createBall: function() {
		var div = document.createElement('div');
		div.classList.add('ball');
		var x = Math.floor(Math.random() * (this.max - this.min + 1));
		var size = (x + this.min) * this.multiplier;
		var inertia = x + this.inertia;
		div.style.height = size + 'px';
		div.style.width = size + 'px';
		div.style.top = Math.floor((this._contentHeight - size / 2 + 1) * Math.random()) / inertia + 'px';
		div.style.left = 'calc(' + Math.floor(Math.random() * 101) + '% - ' + size / 2 + 'px';
		div.dataset.inertia = inertia;
		Polymer.dom(this.$.background).appendChild(div);
		this._balls.push(div);
	},
	_scroll: function() {
		if (!this._chill) {
			this._chill = true;
			requestAnimationFrame(function() {
				var y = this.$.content.scrollTop;
				this._balls.forEach(function(e) {
					e.style.transform = 'translateY(-' + y / e.dataset.inertia + 'px)';
				});
				this._chill = false;
			}.bind(this));
		} else {
			console.log('save');
		}
	},
	_initialize: function() {
		this._contentHeight = this.$.content.scrollHeight;
		for (var i = 0; i < this.number; i++) {
			this._createBall();
		}
	},
	update: function() {
		this._balls = [];
		Polymer.dom(this.$.background).innerHTML = '';
		this._initialize();
		this._scroll();
	},
	attached: function() {
		this._initialize();
	}
});