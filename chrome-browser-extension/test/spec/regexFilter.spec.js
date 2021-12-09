

const DOMAIN = 'cloud-run-service-abcdefghij-em.a.run.app';

// function being tested
function generateRegex(revisionUrl, domain) {
    return RegexFilterBuilder.generateRegex(revisionUrl, domain);
}


describe('Regex Tests', () => {
    it('should only allow tad, jop, hux, and root domain only', () => {
        const regex = generateRegex(['tad---', 'jop---', 'hux---', ''], DOMAIN);
        expect(regex).toEqual('.*://(?:tad---|jop---|hux---|)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tad---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://jop---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://hux---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://cloud-run-service-abcdefghij-em.a.run.app/',
            'https://cloud-run-service-abcdefghij-em.a.run.app/abcde',
            'https://tad---cloud-run-service-abcdefghij-em.a.run.app/defgh',
            'wss://jop---cloud-run-service-abcdefghij-em.a.run.app/websockify'
        ];

        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) !== null).toBeTrue();
        })
    });

    it('should not allow other urls', () => {
        const regex = generateRegex(['tad---', 'jop---', 'hux---', ''], DOMAIN)
        expect(regex).toEqual('.*://(?:tad---|jop---|hux---|)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tax---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://joy---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://hugo---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://acloud-run-service-abcdefghij-em.a.run.app/',
            'https://loud-run-service-abcdefghij-em.a.run.app/'
        ];

        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) === null).toBeTrue();
        })
    });

    it('should work with just two revision url and validate tad---', () => {
        const regex = generateRegex(['tad---', 'spr---'], DOMAIN);
        expect(regex).toEqual('.*://(?:tad---|spr---)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tad---cloud-run-service-abcdefghij-em.a.run.app/'
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) !== null).toBeTrue();
        });
    });

    it('should not validate other revision url if tad--- and spr---', () => {
        const regex = generateRegex(['tad---', 'spr---'], DOMAIN);
        expect(regex).toEqual('.*://(?:tad---|spr---)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tax---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://cloud-run-service-abcdefghij-em.a.run.app/'
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) === null).toBeTrue();
        });
    });

    it('should work with just one revision url validating tad', () => {
        const regex = generateRegex(['tad---'], DOMAIN);
        expect(regex).toEqual('.*://(?:tad---)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tad---cloud-run-service-abcdefghij-em.a.run.app/'
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) !== null).toBeTrue();
        });
    });

    it('should not work with other urls when set to tad---', () => {
        const regex = generateRegex(['tad---'], DOMAIN);
        expect(regex).toEqual('.*://(?:tad---)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tax---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://cloud-run-service-abcdefghij-em.a.run.app/',
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) === null).toBeTrue();
        });
    });

    it('should work with root domain', () => {
        const regex = generateRegex([''], DOMAIN);
        expect(regex).toEqual('.*://(?:)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://cloud-run-service-abcdefghij-em.a.run.app/'
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) !== null).toBeTrue();
        });
    });

    it('should work with only root domain', () => {
        const regex = generateRegex([''], DOMAIN);
        expect(regex).toEqual('.*://(?:)+cloud-run-service-abcdefghij-em.a.run.app');
        const urls = [
            'https://tad---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://fff---cloud-run-service-abcdefghij-em.a.run.app/',
            'https://rrr---cloud-run-service-abcdefghij-em.a.run.app/',
        ];

        console.log(regex);
        urls.forEach((url) => {
            console.log(url.match(regex));
            expect(url.match(regex) === null).toBeTrue();
        });
    });
});