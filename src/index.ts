export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  const { message, stack } = err;

  if (!stack) {
    return {
      message,
      stack: []
    };
  }

  const stackMatcher = /((http(s)?:\/\/){1}.+\/\w\.js:\d+:\d+)$/gim;
  const stackInfoMatcher = /(.+\.js):(\d+):(\d+)/;

  const stackIter: IterableIterator<RegExpMatchArray> = stack.matchAll(stackMatcher);

  const stackArr: Array<{
    line: number
    column: number
    filename: string
  }> = [];

  for (let i of stackIter) {
    const stackInfo = i[0].match(stackInfoMatcher);
    stackArr.push({
      line: Number(stackInfo?.[2]),
      column: Number(stackInfo?.[3]),
      filename: String(stackInfo?.[1])
    });
  }

  return {
    message,
    stack: stackArr
  };
}
