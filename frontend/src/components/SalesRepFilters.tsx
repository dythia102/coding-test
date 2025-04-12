import {
    Box,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { SalesRepFilterOptions } from "@/features/salesReps/useSalesReps";

interface Props {
    filters: SalesRepFilterOptions;
    loading: boolean;
    region: string;
    role: string;
    industry: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
    search: string;
    onRegionChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onIndustryChange: (value: string) => void;
    onSortByChange: (value: string) => void;
    onSortOrderChange: (value: "asc" | "desc") => void;
    onSearchChange: (value: string) => void;
    onClearFilters: () => void;
}

export default function SalesRepFilters({
    filters,
    loading,
    region,
    role,
    industry,
    sortBy,
    sortOrder,
    search,
    onRegionChange,
    onRoleChange,
    onIndustryChange,
    onSortByChange,
    onSortOrderChange,
    onSearchChange,
    onClearFilters,
}: Props) {
    return (
        <>
            <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                <TextField
                    label="Region"
                    value={region}
                    onChange={(e) => onRegionChange(e.target.value)}
                    select
                    fullWidth
                    disabled={loading}
                >
                    <MenuItem value="">All</MenuItem>
                    {filters.regions.map((r) => (
                        <MenuItem key={r} value={r}>
                            {r}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Role"
                    value={role}
                    onChange={(e) => onRoleChange(e.target.value)}
                    select
                    fullWidth
                    disabled={loading}
                >
                    <MenuItem value="">All</MenuItem>
                    {filters.roles.map((r) => (
                        <MenuItem key={r} value={r}>
                            {r}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Industry"
                    value={industry}
                    onChange={(e) => onIndustryChange(e.target.value)}
                    select
                    fullWidth
                    disabled={loading}
                >
                    <MenuItem value="">All</MenuItem>
                    {filters.industries.map((ind) => (
                        <MenuItem key={ind} value={ind}>
                            {ind}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}
                    select
                    fullWidth
                >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="region">Region</MenuItem>
                    <MenuItem value="role">Role</MenuItem>
                </TextField>

                <TextField
                    label={`Sort Order${sortBy ? ` (${sortBy})` : ""}`}
                    value={sortOrder}
                    onChange={(e) =>
                        onSortOrderChange(e.target.value as "asc" | "desc")
                    }
                    select
                    fullWidth
                    disabled={!sortBy}
                >
                    <MenuItem value="asc">Ascending (A → Z)</MenuItem>
                    <MenuItem value="desc">Descending (Z → A)</MenuItem>
                </TextField>

                <Button variant="outlined" color="secondary" onClick={onClearFilters}>
                    Clear Filters
                </Button>
            </Box>

            <TextField
                label="Search by name or skill"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                fullWidth
                margin="normal"
            />
        </>
    );
}
