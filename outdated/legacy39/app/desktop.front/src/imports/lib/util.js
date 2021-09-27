import URLParse from 'url-parse';

export default class Util
{
    static _loadedJs = {};

    static async execute(name, args)
    {
        return new Promise((resolve, reject) => {
            Meteor.apply(name, args, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    static loadJs(src)
    {
        const d = document;

        if (!d || !src)
        {
            return null;
        }

        src = src.toString().trim();

        if (this._loadedJs[src])
        {
            return new Promise((resolve) => {
                resolve();
            });
        }

        const node = d.createElement('script');
        const p = new Promise((resolve) => {
            node.addEventListener('load', () => {
                this._loadedJs[src] = true;
                resolve();
            }, false);
        });

        node.type = 'text/javascript';
        node.setAttribute('async', 'async');
        node.setAttribute('defer', 'defer');
        node.src = src;

        const ctx = d.getElementsByTagName('head')[0] || d.body || d.documentElement;
        ctx.appendChild(node);

        return p;
    }

	static noop()
	{
		return function(){};
	}

	static passCtx(fn, extraArgs) {
		return function wrappedFn(...args) {
			fn.apply(this, _.union(extraArgs, args));
		};
	}

    static getAlphabeticalComparator()
    {
        if ('localeCompare' in String.prototype)
        {
            return (a, b) => {
                return a.localeCompare(b);
            };
        }
        else
        {
            return this.getNumericComparator(a.order, b.order);
        }
    }

    static getNumericComparator()
    {
        return (a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        };
    }

    static findClosestParent(node, condition) {
        let depth = 0;

        // seach by the css selector
        let fn = (n) => {
            return $(node).is(condition);
        };
        if (_.isElement(condition))
        {
            // search by exact node match
            fn = (n) => {
                return condition === n;
            };
        }

        while (node && depth < 50) {
            if (fn(node)) {
                return node;
            }
            node = node.parentElement;
            depth += 1;
        }

        return null;
    }

    static transformCamel(string)
    {
        if (!_.isStringNotEmpty(string))
        {
            return '';
        }

        if (!this._tcRegExp)
        {
            this._tcRegExp = /([A-Z]{1})/g;
        }

        return _.uCFirst(string.replace(this._tcRegExp, ' $1').trim());
    }

    static copyToClipBoard(text)
    {
        const textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.select();

        let result = false;
        try {
            result = document.execCommand('copy');
        } catch (err) {
            result = false;
        }

        document.body.removeChild(textArea);

        return result;
    }

    static parseUrl(url = '')
    {
        if (!url)
        {
            url = FlowRouter.current().path;
        }
        url = new URLParse(url);

        const q = url.query;
        url.params = {};
        if (q)
        {
            url.params = q.trim().replace(/^\?/, '').split('&').reduce((result, item) => {
                item = item.split('=');
                result[item[0]] = decodeURIComponent(item[1]);

                return result;
            }, {});
        }

        return url;
    }
}
