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
    toMatchObjectInArray: function toEqualArray(received, argument) {
        // const pass = this.equals(received.sort(), argument.sort());
        let pass = true;
        if (!Array.isArray(received)) {
            pass = false;
        } else {
            let found = false;
            for (let i = 0; i < received.length; i += 1) {
                try {
                    expect(received[i]).toMatchObject(argument);
                    found = true;
                    break;
                } catch (e) {}
            }

            if (!found) {
                pass = false;
            }
        }

        if (pass) {
            return {
                pass,
                message: '',
            };
        } else {
            return {
                pass,
                message: () => this.utils.diff(received, [argument]),
            };
        }
    },
});
