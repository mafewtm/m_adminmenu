lib.addCommand('admin', {
    help = locale('open_menu'),
}, function(source)
    TriggerClientEvent('m_admin:client:openMenu', source)
end)

lib.callback.register('m_admin:server:checkPermissions', function(source)
    local allowed = IsPlayerAceAllowed(source, 'group.admin')

    if not allowed then
        lib.notify('source', { description = locale('not_allowed'), type = 'error' })
    end

    return allowed
end)