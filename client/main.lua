local isMenuOpen = false

---@param action string The action you wish to target
---@param data? any The data you wish to send along with this action
local function SendReactMessage(action, data)
    SendNUIMessage({
        action = action,
        data = data
    })
end

local function openAdminMenu()
    if isMenuOpen then return end

    local allowed = lib.callback.await('m_adminmenuserver:checkPermissions', false)

    if not allowed or IsNuiFocused() or IsPauseMenuActive() then return end

    isMenuOpen = true

    SetNuiFocus(true, true)
    SendReactMessage('setVisible', true)
end

local function closeAdminMenu()
    if not isMenuOpen then return end

    isMenuOpen = false

    SetNuiFocus(false, false)
    SendReactMessage('setVisible', false)
end

RegisterNetEvent('m_adminmenuclient:openMenu', openAdminMenu)

RegisterNuiCallback('closeMenu', function(_, cb)
    cb(1)

    closeAdminMenu()
end)

RegisterNuiCallback('getPlayers', function(_, cb)
    local players = lib.callback.await('m_adminmenuserver:getPlayers', false)

    cb(players)
end)