import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkWritable, Writable, ReadonlyKeys, WritableKeys } from "../lib/types";

function testMarkWritable() {
  type Example = {
    readonly readonly1: Date;
    readonly readonly2: RegExp;
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type cases = [
    Assert<IsExact<MarkWritable<Example, never>, Example>>,
    Assert<IsExact<MarkWritable<Example, WritableKeys<Example>>, Example>>,
    Assert<IsExact<MarkWritable<Example, ReadonlyKeys<Example>>, Writable<Example>>>,
    Assert<
      IsExact<
        MarkWritable<Example, "readonly1">,
        {
          readonly1: Date;
          readonly readonly2: RegExp;
          required1: number;
          required2: string;
          optional1?: null;
          optional2?: boolean;
        }
      >
    >,
    // @ts-expect-error do NOT support union types
    MarkWritable<Example | { a: 1 }, "readonly1">,
  ];
}
