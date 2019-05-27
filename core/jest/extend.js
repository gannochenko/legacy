expect.extend({
    toEqualArray: function toEqualArray(received, argument) {
        const pass = this.equals(received.sort(), argument.sort());

        if (pass) {
            return {
                pass,
                message: '',
            };
        } else {
            return {
                pass,
                message: () => this.utils.diff(received, argument),
            };
        }
    },
});
