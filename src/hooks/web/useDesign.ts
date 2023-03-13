/*
 * @Description:
 * @Version: 2.0
 * @Author: zhangpf1
 * @Date: 2023-02-25 10:17:34
 * @LastEditTime: 2023-02-25 10:24:42
 */
import variables from '@/styles/variables.module.less'

export const useDesign = () => {
  const lessVariables = variables

  /**
   * @param scope 类名
   * @returns 返回空间名-类名
   */
  const getPrefixCls = (scope: string) => {
    return `${lessVariables.namespace}-${scope}`
  }

  return {
    variables: lessVariables,
    getPrefixCls
  }
}
