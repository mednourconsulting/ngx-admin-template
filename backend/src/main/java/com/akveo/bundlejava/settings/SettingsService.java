package com.akveo.bundlejava.settings;

import com.akveo.bundlejava.settings.exception.SettingsNotFoundHttpException;
import com.akveo.bundlejava.user.User;
import com.akveo.bundlejava.user.UserContextHolder;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {
    private ModelMapper modelMapper;
    private SettingsRepository settingsRepository;

    @Autowired
    public SettingsService(ModelMapper modelMapper,
                          SettingsRepository settingsRepository) {
        this.modelMapper = modelMapper;
        this.settingsRepository = settingsRepository;
    }

    public Settings findByThemeName(String themeName) {
        return settingsRepository.findByThemeName(themeName);
    }

    public Settings getSettingsByUserId(Long id) {
        return settingsRepository.findByUserId(id);
    }

    public SettingsDTO getCurrentSettings() {
        User currentUser = UserContextHolder.getUser();
        Settings settings = getSettingsByUserId(currentUser.getId());
        return modelMapper.map(settings, SettingsDTO.class);
    }

    public SettingsDTO updateCurrentSettings(SettingsDTO settingsDTO) {
        User user = UserContextHolder.getUser();
        Long id = user.getId();
        return updateSettingsByUserId(id, settingsDTO);
    }

    private SettingsDTO updateSettingsByUserId(Long id, SettingsDTO settingsDTO) {
        settingsRepository.findByUserId(id);

        Settings updatedSettings = modelMapper.map(settingsDTO, Settings.class);
        updatedSettings.setId(id);
        settingsRepository.save(updatedSettings);
        return settingsDTO;
    }
}
