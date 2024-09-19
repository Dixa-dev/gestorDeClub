
import { describe, it, expect,test } from 'vitest';
import * as cuotas from "../controllers/cuotas.controllers.js"

test('this test will not run', () => {
  expect('A').toBe('A');
});

test('Simple test', () => {
  const valor = 2+2
    expect(valor).toBe(4);
  
});

import { describe, it } from 'vitest'


describe('suite', () => {
  it('serial test', async () => { /* ... */ })
  it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
  it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
})