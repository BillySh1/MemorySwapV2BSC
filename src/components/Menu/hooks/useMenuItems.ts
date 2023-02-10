import { useMemo } from 'react'
import { useTranslation } from '../../../contexts/Localization'
import { useMenuItemsStatus } from './useMenuItemsStatus'
import config, { ConfigMenuItemsType } from '../config/config'

export const useMenuItems = (): ConfigMenuItemsType[] => {
  const {
    t,
    currentLanguage: { code: languageCode },
  } = useTranslation()
  const menuItemsStatus = useMenuItemsStatus()

  const menuItems = useMemo(() => {
    return config(t, languageCode)
  }, [t, languageCode])

  return useMemo(() => {
    if (menuItemsStatus && Object.keys(menuItemsStatus).length) {
      return menuItems.map((item) => {
        const innerItems = item.items.map((innerItem) => {
         
          return innerItem
        })
        return { ...item, items: innerItems }
      })
    }
    return menuItems
  }, [menuItems, menuItemsStatus])
}
