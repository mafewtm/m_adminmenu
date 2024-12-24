lib.addCommand('admin', {
    help = locale('open_menu'),
    restricted = 'group.admin',
}, function(source)
    TriggerClientEvent('m_adminmenuclient:openMenu', source)
end)

lib.callback.register('m_adminmenuserver:checkPermissions', function(source)
    local allowed = IsPlayerAceAllowed(source, 'command.admin')

    if not allowed then
        lib.notify('source', { description = locale('not_allowed'), type = 'error' })
    end

    return allowed
end)

lib.callback.register('m_adminmenuserver:getPlayers', function()
    local allowed = IsPlayerAceAllowed(source, 'command.admin')

    if not allowed then return end

    local players = {}

    for _, playerIds in pairs(GetPlayers()) do
        local playerId = tonumber(playerIds)
        local player = exports.qbx_core:GetPlayer(playerId)
        local fullName = ('%s %s'):format(player.PlayerData.charinfo.firstname, player.PlayerData.charinfo.lastname)
        local playerName = GetPlayerName(playerId --[[@as integer]])

        players[#players + 1] = {
            serverId = playerId,
            citizenId = player.PlayerData.citizenid,
            characterName = fullName,
            accountName = playerName,
        }
    end

    return players
end)