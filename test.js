import test from 'ava';
import g from './';

test('throw error if wrong gradient arguments', t => {
	t.throws(() => g()('abc'));
	t.throws(() => g('red')('abc'));
});

test('works fine', t => {
	t.is(g('blue', 'white', 'red')('abc'), '\u001b[94ma\u001b[39m\u001b[97mb\u001b[39m\u001b[91mc\u001b[39m');
});
