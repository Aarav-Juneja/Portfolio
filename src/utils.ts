import _ from "lodash";

export const urlSafeTransform = (str: string) => _.kebabCase(str);
