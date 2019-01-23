module.exports = function override(config, env) {
    config.module.rules[1].oneOf.map((rule, i) => {
        const regex = rule.test ? rule.test.toString() : "";

        if (regex != /\.(scss|sass)$/) {
            return;
        }

        const useInjected = [];

        rule.use.forEach((use, x) => {
            if (use.loader === undefined) {
                useInjected.push(use);

                return;
            }

            if (!use.loader.includes('/css-loader/')) {
                useInjected.push(use);

                return;
            }

            useInjected.push(use);
            useInjected.push({
                loader: 'resolve-url-loader',
            });
        });

        rule.use = useInjected;
        config.module.rules[1].oneOf[i] = rule;
    });

    return config;
};
