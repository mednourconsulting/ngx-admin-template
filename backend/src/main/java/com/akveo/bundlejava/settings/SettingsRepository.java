package com.akveo.bundlejava.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {
    Settings findByThemeName(String themeName);
    Settings findByUserId(Long userId);
}
