Number.prototype.padLeft = function (base, chr) {
	var len = String(base || 10).length - String(this).length + 1;
	return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

function dateToString(d) {
	d = new Date(
		d.toLocaleString("pl-PL", {
			timeZone: "Europe/Warsaw",
		})
	);

	return (
		[d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join(
			"-"
		) +
		" " +
		[
			d.getHours().padLeft(),
			d.getMinutes().padLeft(),
			d.getSeconds().padLeft(),
		].join(":")
	);
}

let d = new Date();
console.log(dateToString(d));
